const uniqid = require("uniqid");
const User = require("../../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");
const Product = require("../../models/product/productModel");
const Cart = require("../../models/cartModel");
const Order = require("../../models/orderModel");
const productVariantModel = require("../../models/product/productVariantModel");

const createOrder = asyncHandler(async (req, res) => {
  const { paymentMethod, couponApplied, shippingAddress } = req.body;
  const { _id } = req.user;

  // Kiểm tra tính hợp lệ của ID MongoDB
  validateMongoDbId(_id);

  try {
    // Kiểm tra phương thức thanh toán hợp lệ
    if (
      !["Thanh Toán Khi Nhận Hàng", "Chuyển Khoản Ngân Hàng"].includes(
        paymentMethod
      )
    ) {
      return res
        .status(400)
        .json({ message: "Phương thức thanh toán không hợp lệ." });
    }

    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderedBy: user._id });
    let finalAmount = 0;

    // Kiểm tra nếu có áp dụng mã giảm giá
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }

    // Logic tính phí vận chuyển (nếu có)
    const shippingFee = 0; // Bạn có thể cập nhật logic tính phí vận chuyển tại đây
    const totalPrice = finalAmount + shippingFee;

    // Xử lý thông tin thanh toán dựa trên phương thức thanh toán
    let paymentStatus, paymentIntent;

    if (paymentMethod === "Thanh Toán Khi Nhận Hàng") {
      paymentStatus = "Chưa Thanh Toán"; // Thanh toán COD
      paymentIntent = {
        id: uniqid(),
        method: "COD",
        amount: totalPrice,
        status: "Thanh Toán Khi Nhận Hàng",
        created: Date.now(),
        currency: "vnd",
      };
    } else if (paymentMethod === "Chuyển Khoản Ngân Hàng") {
      paymentStatus = "Đã Thanh Toán";
      paymentIntent = {
        id: uniqid(),
        method: "Chuyển Khoản Ngân Hàng",
        amount: totalPrice,
        status: "Đã Thanh Toán",
        created: Date.now(),
        currency: "vnd",
      };
    }

    // Tạo đơn hàng mới
    let newOrder = new Order({
      products: userCart.products.map((item) => ({
        product: item.product,
        count: item.count,
        price: item.price,
        variant: item.variant || null,
      })),
      orderedBy: user._id,
      totalProductPrice: finalAmount,
      discountApplied: couponApplied ? userCart.cartTotal - finalAmount : 0,
      shippingFee: shippingFee,
      totalPrice: totalPrice,
      shippingAddress: {
        name: shippingAddress.name,
        phone: shippingAddress.phone,
        addressLine1: shippingAddress.addressLine1,
        city: shippingAddress.city,
        district: shippingAddress.district,
        ward: shippingAddress.ward,
        postalCode: shippingAddress.postalCode || "",
      },
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus,
      orderStatus: "Đang Xử Lý",
      paymentIntent: paymentIntent,
    });

    await newOrder.save();

    // Cập nhật kho sản phẩm và số lượng đã bán
    let updateProducts = userCart.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: {
          $inc: { quantity: -item.count, sold: +item.count },
        },
      },
    }));

    await Product.bulkWrite(updateProducts, {});

    // Cập nhật kho sản phẩm cho biến thể (nếu có)
    let updateVariants = userCart.products
      .filter((item) => item.variant) // Chỉ cập nhật các sản phẩm có biến thể
      .map((item) => ({
        updateOne: {
          filter: { _id: item.variant },
          update: {
            $inc: { quantity: -item.count },
          },
        },
      }));

    await productVariantModel.bulkWrite(updateVariants, {});

    // Xóa giỏ hàng sau khi tạo đơn hàng thành công
    await Cart.findOneAndDelete({ orderedBy: user._id });

    res.json({ message: "Đơn hàng đã được đặt thành công", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API lấy danh sách tất cả các đơn hàng của một người dùng
const getUserOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    const orders = await Order.find({ orderedBy: _id })
      .populate("products.product", "name price")
      .populate("products.variant", "name quantity")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào." });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API lấy thông tin chi tiết của một đơn hàng cụ thể
const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { _id } = req.user;

  validateMongoDbId(orderId);
  validateMongoDbId(_id);

  try {
    const order = await Order.findOne({ _id: orderId, orderedBy: _id })
      .populate("products.product", "name price")
      .populate("products.variant", "name quantity");

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Hủy đơn hàng cho người dùng
const cancelOrderForUser = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { _id } = req.user;
  const { cancellationReason } = req.body; // Nhận lý do hủy từ người dùng

  validateMongoDbId(orderId);
  validateMongoDbId(_id);

  // Kiểm tra nếu không có lý do hủy đơn hàng
  if (!cancellationReason || cancellationReason.trim() === "") {
    return res.status(400).json({ message: "Lý do hủy đơn hàng là bắt buộc." });
  }

  try {
    const order = await Order.findOne({ _id: orderId, orderedBy: _id });

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    // Người dùng chỉ có thể hủy đơn hàng nếu chưa được xác nhận
    if (order.orderStatus === "Đã Xác Nhận") {
      return res
        .status(400)
        .json({ message: "Không thể hủy đơn hàng đã xác nhận." });
    }

    // Cộng lại số lượng sản phẩm đã trừ
    let revertProducts = order.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: {
          $inc: { quantity: +item.count, sold: -item.count },
        },
      },
    }));

    await Product.bulkWrite(revertProducts, {});

    let revertVariants = order.products
      .filter((item) => item.variant)
      .map((item) => ({
        updateOne: {
          filter: { _id: item.variant },
          update: {
            $inc: { quantity: +item.count },
          },
        },
      }));

    await productVariantModel.bulkWrite(revertVariants, {});

    // Cập nhật trạng thái đơn hàng thành 'Đã Hủy' và lưu lý do
    order.orderStatus = "Đã Hủy";
    order.cancellationReason = cancellationReason; // Lưu lý do hủy
    await order.save();

    res.json({ message: "Đơn hàng đã được hủy thành công.", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hủy đơn hàng cho admin
const cancelOrderForAdmin = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { cancellationReason } = req.body; // Nhận lý do hủy từ admin

  validateMongoDbId(orderId);

  // Kiểm tra nếu không có lý do hủy đơn hàng
  if (!cancellationReason || cancellationReason.trim() === "") {
    return res.status(400).json({ message: "Lý do hủy đơn hàng là bắt buộc." });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    // Cộng lại số lượng sản phẩm đã trừ
    let revertProducts = order.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: {
          $inc: { quantity: +item.count, sold: -item.count },
        },
      },
    }));

    await Product.bulkWrite(revertProducts, {});

    let revertVariants = order.products
      .filter((item) => item.variant)
      .map((item) => ({
        updateOne: {
          filter: { _id: item.variant },
          update: {
            $inc: { quantity: +item.count },
          },
        },
      }));

    await productVariantModel.bulkWrite(revertVariants, {});

    // Cập nhật trạng thái đơn hàng thành 'Đã Hủy' và lưu lý do
    order.orderStatus = "Đã Hủy";
    order.cancellationReason = cancellationReason; // Lưu lý do hủy
    await order.save();

    res.json({ message: "Đơn hàng đã được hủy bởi admin.", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật trạng thái đơn hàng (chỉ dành cho admin)
const updateStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
  }

  // Cập nhật trạng thái đơn hàng nếu được cung cấp, nếu không giữ nguyên trạng thái hiện tại
  if (orderStatus) {
    order.orderStatus = orderStatus;
    await order.save();
    return res
      .status(200)
      .json({ message: "Trạng thái đơn hàng đã được cập nhật.", order });
  }

  res.status(400).json({ message: "Cần cung cấp trạng thái đơn hàng." });
});

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  updateStatus,
  cancelOrderForUser,
  cancelOrderForAdmin,
};
