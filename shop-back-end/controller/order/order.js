const uniqid = require("uniqid");
const User = require("../../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");
const Product = require("../../models/product/productModel");
const Cart = require("../../models/cartModel");
const Order = require("../../models/orderModel");

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

    // Kiểm tra nếu có áp dụng mã giảm giá, nếu không lấy tổng giá trị giỏ hàng
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }

    // Logic tính phí vận chuyển (nếu có)
    const shippingFee = 0; // Bạn có thể cập nhật logic tính phí vận chuyển tại đây

    // Tính tổng số tiền phải trả
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
      paymentStatus = "Đã Thanh Toán"; // Giả sử thanh toán online thành công
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
      orderStatus: "Đang Xử Lý", // Trạng thái ban đầu của đơn hàng
      paymentIntent: paymentIntent,
    });

    await newOrder.save();

    // Cập nhật kho sản phẩm và số lượng đã bán
    let update = userCart.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: {
          $inc: { quantity: -item.count, sold: +item.count },
        },
      },
    }));

    await Product.bulkWrite(update, {});

    // Xóa giỏ hàng sau khi tạo đơn hàng thành công
    await Cart.findOneAndDelete({ orderedBy: user._id });

    res.json({ message: "Đơn hàng đã được đặt thành công", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createOrder,
};
