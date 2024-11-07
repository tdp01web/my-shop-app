const uniqid = require("uniqid");
const User = require("../../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");
const Product = require("../../models/product/productModel");
const Cart = require("../../models/cartModel");
const Order = require("../../models/orderModel");
const productVariantModel = require("../../models/product/productVariantModel");
const axios = require("axios");
const crypto = require("crypto");

const nodemailer = require("nodemailer");

const createOrder = asyncHandler(async (req, res) => {
  const { paymentMethod, couponApplied, shippingAddress, couponDetails } =
    req.body;
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderedBy: user._id })
      .populate({
        path: "products.product",
        populate: [{ path: "category" }, { path: "brand" }, { path: "lcd" }],
        strictPopulate: false,
      })
      .populate({
        path: "products.variant",
        populate: [
          { path: "color" },
          { path: "ram" },
          { path: "storage" },
          { path: "processor" },
          { path: "gpu" },
        ],
        strictPopulate: false,
      });

    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng của bạn đang trống." });
    }

    let finalAmount =
      couponApplied && userCart.totalAfterDiscount
        ? userCart.totalAfterDiscount
        : userCart.cartTotal;
    const shippingFee = req.body.deliveryFee;
    const totalPrice = finalAmount + shippingFee;

    let newOrder = new Order({
      products: userCart.products.map((item) => ({
        title: item.product.title,
        slug: item.product.slug,
        description: item.product.description,
        category: item.product.category?.name || null,
        brand: item.product.brand?.title || null,
        lcd: item.product.lcd?.size || null,
        images: item.product.images,
        color: item.variant?.color?.title || null,
        ram: item.variant?.ram?.size || null,
        storage: item.variant?.storage?.capacity || null,
        processor: item.variant?.processor?.name || null,
        gpu: item.variant?.gpu?.name || null,
        price: item.variant ? item.variant.price : item.product.price,
        quantity: item.variant ? item.variant.quantity : item.product.quantity,
        count: item.count,
      })),
      orderedBy: user._id,
      totalProductPrice: finalAmount,
      discountApplied: couponApplied ? userCart.cartTotal - finalAmount : 0,
      couponDiscountDetails: couponDetails,
      shippingFee: shippingFee,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "MOMO" ? "Chờ Thanh Toán" : "Đang Xử lý",
      orderStatus: "Đang Xử Lý",
    });

    const savedOrder = await newOrder.save();

    let paymentIntent;
    if (paymentMethod === "MOMO") {
      try {
        const orderId = savedOrder._id.toString();
        paymentIntent = await handleMomoPayment(totalPrice, orderId);
        savedOrder.paymentIntent = paymentIntent;
        await savedOrder.save();

        // Gửi email xác nhận khi thanh toán MOMO thành công
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.MP,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Cảm ơn bạn đã đặt hàng!",
          text: `Xin chào \n\nCảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi.\nMã đơn hàng của bạn là: ${savedOrder._id}\nTổng số tiền: ${totalPrice}.\n\nChúng tôi sẽ xử lý đơn hàng và giao hàng trong thời gian sớm nhất!\n\nTrân trọng,\nCửa hàng của bạn`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Lỗi gửi email:", error);
          } else {
            console.log("Email gửi thành công:", info.response);
          }
        });

        return res.json({ message: "Redirecting to MoMo", paymentIntent });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Xử lý thanh toán MOMO thất bại." });
      }
    }

    let updateProducts = userCart.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }));

    await Product.bulkWrite(updateProducts, {});

    if (userCart.products.some((item) => item.variant)) {
      let updateVariants = userCart.products
        .filter((item) => item.variant)
        .map((item) => ({
          updateOne: {
            filter: { _id: item.variant },
            update: { $inc: { quantity: -item.count } },
          },
        }));
      await productVariantModel.bulkWrite(updateVariants, {});
    }

    await Cart.findOneAndDelete({ orderedBy: user._id });

    if (paymentMethod !== "MOMO") {
      // Gửi email cho các phương thức thanh toán khác (không qua MOMO)
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.MP,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Cảm ơn bạn đã đặt hàng!",
        text: `Xin chào \n\nCảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi.\nMã đơn hàng của bạn là: ${savedOrder._id}\nTổng số tiền: ${totalPrice}.\n\nChúng tôi sẽ xử lý đơn hàng và giao hàng trong thời gian sớm nhất!\n\nTrân trọng,\nCửa hàng của bạn`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Lỗi gửi email:", error);
        } else {
          console.log("Email gửi thành công:", info.response);
        }
      });
    }

    res.json({ message: "Đơn hàng đã được đặt thành công", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hàm xử lý thanh toán MOMO
const handleMomoPayment = async (amount, orderId) => {
  var accessKey = "F8BBA842ECF85";
  var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var orderInfo = "pay with MoMo";
  var partnerCode = "MOMO";
  var redirectUrl = "http://localhost:5173/order-success";
  var ipnUrl =
    "https://f602-2405-4802-1cd8-1190-fc04-c48e-10cc-adeb.ngrok-free.app";
  var requestType = "payWithMethod";
  var requestId = partnerCode + new Date().getTime();
  var extraData = "";
  var autoCapture = true;
  var lang = "vi";

  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    signature: signature,
  });

  const axios = require("axios");
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  try {
    const result = await axios.request(options);
    return result.data;
  } catch (error) {
    throw new Error("Xử lý thanh toán MOMO thất bại.");
  }
};

// Callback xử lý kết quả thanh toán từ MOMO
const callback = asyncHandler(async (req, res) => {
  const { orderId, requestId, resultCode } = req.body; // Lấy thông tin từ callback MoMo

  if (resultCode === 0) {
    // Thanh toán thành công
    await Order.updateOne(
      { "paymentIntent.id": requestId },
      { $set: { paymentStatus: "Đã Thanh Toán" } }
    );
  } else {
    // Thanh toán thất bại
    await Order.updateOne(
      { "paymentIntent.id": requestId },
      { $set: { paymentStatus: "Thanh Toán Thất Bại" } }
    );
  }
  res.status(200).send("IPN received");
});

// Kiểm tra trạng thái giao dịch MOMO
const transactionStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.body; // Lấy orderId từ yêu cầu của client

  const accessKey = "F8BBA842ECF85";
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  // Tạo chữ ký cho request kiểm tra
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode: "MOMO",
    orderId: orderId,
    requestId: orderId,
    signature,
    lang: "vi",
  };

  try {
    const result = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/query",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.status(200).json(result.data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Kiểm tra trạng thái giao dịch thất bại" });
  }
});

// API lấy danh sách tất cả các đơn hàng của một người dùng
const getUserOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    const orders = await Order.find({ orderedBy: _id }).sort({ createdAt: -1 });

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
    const order = await Order.findOne({ _id: orderId, orderedBy: _id });

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API lấy tất cả đơn hàng dành cho admin
const getAllOrdersForAdmin = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào." });
    }

    res.json(orders);
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
const statusOrderFlow = [
  "Đang Xử Lý",
  "Đã Xác Nhận",
  "Đang Đóng Gói",
  "Đang Giao Hàng",
  "Đã Giao Hàng",
  "Hoàn Thành",
  "Đã Hủy",
];

const updateStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus, cancellationReason } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
  }

  const currentStatusIndex = statusOrderFlow.indexOf(order.orderStatus);
  const newStatusIndex = statusOrderFlow.indexOf(orderStatus);

  // Không cho phép quay lại trạng thái trước đó
  if (newStatusIndex <= currentStatusIndex && orderStatus !== "Đã Hủy") {
    return res.status(400).json({
      message: "Không thể quay lại trạng thái trước đó.",
    });
  }

  // Không cho phép hủy nếu đơn đã xác nhận
  if (order.orderStatus === "Đã Xác Nhận" && orderStatus === "Đã Hủy") {
    return res.status(400).json({
      message: "Không thể hủy đơn hàng đã được xác nhận.",
    });
  }

  // Yêu cầu lý do khi hủy đơn
  if (orderStatus === "Đã Hủy" && !cancellationReason) {
    return res.status(400).json({
      message: "Cần cung cấp lý do hủy đơn hàng.",
    });
  }

  // Cập nhật trạng thái và lý do hủy (nếu có)
  order.orderStatus = orderStatus;
  if (orderStatus === "Đã Hủy") {
    order.cancellationReason = cancellationReason;
  }

  await order.save();

  return res.status(200).json({
    message: "Trạng thái đơn hàng đã được cập nhật.",
    order,
  });
});

//Thanh toán online

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  updateStatus,
  cancelOrderForUser,
  cancelOrderForAdmin,
  getAllOrdersForAdmin,
  handleMomoPayment,
  callback,
  transactionStatus,
};
