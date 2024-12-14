const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Product = require("../../models/product/productModel");
const Cart = require("../../models/cartModel");
const User = require("../../models/userModel");
const ProductVariant = require("../../models/product/productVariantModel");
const Coupon = require("../../models/couponModel"); // Đảm bảo bạn đã khai báo model Coupon
const validateMongoDbId = require("../../utils/validateMongodbId");

const addToCart = asyncHandler(async (req, res) => {
  const { products } = req.body; // Lấy danh sách sản phẩm từ body
  const userId = req.user._id; // Lấy ID người dùng từ token đăng nhập
  validateMongoDbId(userId); // Kiểm tra ID hợp lệ

  try {
    // Lấy giỏ hàng hiện tại của người dùng
    let cart = await Cart.findOne({ orderedBy: userId });

    // Nếu giỏ hàng không tồn tại, tạo mới
    if (!cart) {
      cart = new Cart({
        products: [],
        cartTotal: 0,
        orderedBy: userId,
      });
    }

    // Duyệt qua tất cả các sản phẩm được gửi trong request
    for (let i = 0; i < products.length; i++) {
      const { product, variant, count } = products[i];

      // Tìm variant của sản phẩm trong cơ sở dữ liệu
      const variantData = await ProductVariant.findById(variant);

      if (!variantData) {
        return res
          .status(400)
          .json({ message: "Biến thể sản phẩm không tồn tại" });
      }

      // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
      const existingProduct = cart.products.find(
        (p) =>
          p.product.toString() === product && p.variant.toString() === variant
      );

      // Nếu sản phẩm đã có, trả về thông báo và dừng thêm vào giỏ hàng
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: "Sản phẩm này đã có trong giỏ hàng." });
      }

      // Nếu sản phẩm chưa có, thêm sản phẩm vào giỏ hàng
      cart.products.push({
        product,
        variant,
        count,
        price: variantData.price,
      });
    }

    // ** Tính lại tổng tiền của tất cả các sản phẩm trong giỏ hàng **
    cart.cartTotal = cart.products.reduce((total, item) => {
      return total + item.count * item.price;
    }, 0);

    await cart.save(); // Lưu giỏ hàng sau khi cập nhật

    // Lấy lại giỏ hàng đã cập nhật, đảm bảo thông tin sản phẩm và biến thể được đầy đủ
    cart = await Cart.findOne({ orderedBy: userId }).populate(
      "products.product products.variant"
    );

    // Trả về giỏ hàng đã cập nhật
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy giỏ hàng của người dùng
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  validateMongoDbId(userId);

  try {
    let cart = await Cart.findOne({ orderedBy: userId })
      .populate("products.product")
      .populate({
        path: "products.variant",
        populate: [
          { path: "ram", select: "size" },
          { path: "storage", select: "capacity" },
          { path: "processor", select: "name" },
          { path: "gpu", select: "name" },
        ],
      });

    if (!cart || cart.products.length === 0) {
      return res.status(200).json({ message: "Giỏ hàng trống.", products: [] });
    }

    // Cập nhật giá sản phẩm và kiểm tra trạng thái
    await cart.updatePrices();

    res.status(200).json({
      products: cart.products.map((item) => ({
        ...item._doc,
        unavailable: item.unavailable, // Trả về trạng thái khả dụng của sản phẩm
      })),
      cartTotal: cart.cartTotal,
      totalAfterDiscount: cart.totalAfterDiscount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa một sản phẩm khỏi giỏ hàng
const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, variantId } = req.params; // Lấy productId và variantId từ tham số
  validateMongoDbId(userId);

  try {
    let cart = await Cart.findOne({ orderedBy: userId });

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    // Lọc ra các sản phẩm không trùng với sản phẩm cần xóa
    cart.products = cart.products.filter(
      (p) =>
        p.product.toString() !== productId || p.variant.toString() !== variantId
    );

    await cart.calculateCartTotal(); // Tính lại tổng tiền giỏ hàng sau khi xóa
    await cart.save(); // Lưu giỏ hàng đã cập nhật

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa toàn bộ giỏ hàng
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  validateMongoDbId(userId);

  try {
    const cart = await Cart.findOneAndUpdate(
      { orderedBy: userId },
      { products: [], cartTotal: 0, totalAfterDiscount: 0 },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    res.status(200).json({ message: "Giỏ hàng đã được xóa.", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Áp dụng mã giảm giá
const applyCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.body;
  const userId = req.user._id;
  validateMongoDbId(userId);

  try {
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(400).json({ message: "Mã giảm giá không hợp lệ." });
    }

    const now = new Date();
    if (coupon.startDate > now) {
      return res.status(400).json({ message: "Mã giảm giá chưa bắt đầu." });
    }

    if (coupon.expiry < now) {
      return res.status(400).json({ message: "Mã giảm giá đã hết hạn." });
    }

    if (coupon.usedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Bạn đã sử dụng mã giảm giá này." });
    }

    if (coupon.usedBy.length >= coupon.maxUses) {
      return res
        .status(400)
        .json({ message: "Mã giảm giá đã đạt giới hạn sử dụng." });
    }

    const cart = await Cart.findOne({ orderedBy: userId });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    cart.applyCoupon(coupon);
    console.log("Cart after applying coupon:", cart);

    await cart.save();
    const result = await cart.save();

    res.status(200).json({
      message: "Mã giảm giá đã được áp dụng thành công.",
      totalAfterDiscount: cart.totalAfterDiscount,
      appliedCoupon: cart.appliedCoupon,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hủy mã giảm giá
const cancelCoupon = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Lấy userId từ JWT hoặc session
  validateMongoDbId(userId); // Kiểm tra id người dùng hợp lệ

  try {
    // Tìm giỏ hàng của người dùng
    const cart = await Cart.findOne({ orderedBy: userId });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    // Nếu không có mã giảm giá nào được áp dụng, thông báo lỗi
    if (!cart.appliedCoupon) {
      return res
        .status(400)
        .json({ message: "Giỏ hàng không áp dụng mã giảm giá." });
    }

    // Hủy mã giảm giá
    await cart.cancelCoupon();

    res.status(200).json({
      message: "Mã giảm giá đã bị hủy.",
      totalAfterDiscount: cart.totalAfterDiscount, // Cập nhật lại tổng giỏ hàng sau khi hủy mã giảm giá
      appliedCoupon: cart.appliedCoupon, // Trả về thông tin mã giảm giá đã áp dụng (null nếu không có)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, variantId } = req.params; // Lấy productId và variantId từ tham số
  const { count } = req.body; // Số lượng mới từ body
  validateMongoDbId(userId);

  try {
    let cart = await Cart.findOne({ orderedBy: userId });

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    // Tìm sản phẩm trong giỏ hàng
    const productIndex = cart.products.findIndex(
      (p) =>
        p.product.toString() === productId && p.variant.toString() === variantId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không tồn tại trong giỏ hàng." });
    }

    // Cập nhật số lượng sản phẩm
    cart.products[productIndex].count = count;

    await cart.calculateCartTotal(); // Tính lại tổng tiền giỏ hàng
    await cart.save(); // Lưu giỏ hàng đã cập nhật

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  applyCoupon,
  updateCart,
  cancelCoupon,
};
