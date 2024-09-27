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

      // Nếu sản phẩm đã có, cập nhật số lượng và giá
      if (existingProduct) {
        existingProduct.count += count;
        existingProduct.price = variantData.price;
      } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm vào giỏ hàng
        cart.products.push({
          product,
          variant,
          count,
          price: variantData.price,
        });
      }
    }

    // ** Tính lại tổng tiền của tất cả các sản phẩm trong giỏ hàng **
    cart.cartTotal = cart.products.reduce((total, item) => {
      return total + item.count * item.price; // Tổng dựa trên số lượng và giá của tất cả các sản phẩm
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
  const userId = req.user._id; // Lấy ID người dùng từ token
  validateMongoDbId(userId); // Kiểm tra ID hợp lệ

  try {
    let cart = await Cart.findOne({ orderedBy: userId })
      .populate("products.product")
      .populate("products.variant");

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng trống." });
    }

    // Cập nhật giá sản phẩm nếu có thay đổi
    await cart.updatePrices();

    res.status(200).json(cart);
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
  const { couponCode } = req.body;
  const userId = req.user._id;
  validateMongoDbId(userId);

  try {
    // Tìm mã giảm giá theo couponCode
    const coupon = await Coupon.findOne({ name: couponCode });

    // Kiểm tra mã giảm giá có tồn tại và chưa hết hạn
    if (!coupon || coupon.expiry < new Date()) {
      return res
        .status(400)
        .json({ message: "Mã giảm giá không hợp lệ hoặc đã hết hạn." });
    }

    // Kiểm tra nếu trường usedBy có tồn tại và là mảng
    if (!Array.isArray(coupon.usedBy)) {
      coupon.usedBy = []; // Khởi tạo mảng nếu chưa có
    }

    // Kiểm tra nếu người dùng đã sử dụng mã giảm giá này
    if (coupon.usedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Mã giảm giá này đã được bạn sử dụng." });
    }

    const cart = await Cart.findOne({ orderedBy: userId });

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    // Tính toán số tiền giảm giá
    const discountAmount = (cart.cartTotal * coupon.discount) / 100;
    cart.totalAfterDiscount = cart.cartTotal - discountAmount;

    // Lưu mã giảm giá đã sử dụng bởi người dùng
    coupon.usedBy.push(userId);
    await coupon.save();
    await cart.save();

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
};
