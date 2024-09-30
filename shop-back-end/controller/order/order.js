const uniqid = require("uniqid");
const User = require("../../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");
const Product = require("../../models/product/productModel");
const Cart = require("../../models/cartModel");
const Order = require("../../models/orderModel");

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;

  // Kiểm tra tính hợp lệ của ID MongoDB
  validateMongoDbId(_id);

  try {
    // Đảm bảo phương thức COD có mặt
    if (!COD) {
      return res
        .status(400)
        .json({ message: "Tạo đơn hàng thất bại: Cần COD." });
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

    // Tạo đơn hàng mới
    let newOrder = new Order({
      products: userCart.products.map((item) => ({
        product: item.product,
        count: item.count,
        price: item.price,
        variant: item.variant || null,
      })),
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Thanh Toán Khi Nhận Hàng",
        created: Date.now(),
        currency: "vnd",
      },
      orderedBy: user._id,
      orderStatus: "Đang Xử Lý", // Trạng thái ban đầu của đơn hàng
      totalProductPrice: finalAmount,
      shippingFee: 0, // Thêm logic tính phí vận chuyển nếu cần
      totalPrice: finalAmount, // Cập nhật dựa trên logic tính tổng giá thực tế
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
    await Cart.findOneAndRemove({ orderedBy: user._id });

    res.json({ message: "Đơn hàng đã được đặt thành công", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createOrder,
};
