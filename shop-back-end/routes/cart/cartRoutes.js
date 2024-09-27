const express = require("express");
const {
  getCart,
  removeFromCart,
  clearCart,
  applyCoupon,
  addToCart,
} = require("../../controller/cart/cartCtrl");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/authMiddlewares");
const router = express.Router();

//! Giỏ hàng
router.post("/", authMiddleware, addToCart); // Thêm sản phẩm vào giỏ hàng
router.get("/getCart", authMiddleware, getCart); // Lấy giỏ hàng của người dùng
router.delete("/emptyCart", authMiddleware, clearCart); // Xóa tất cả sản phẩm trong giỏ hàng
router.delete("/removeProductFromCart", authMiddleware, removeFromCart); // Xóa sản phẩm khỏi giỏ hàng
router.put("/applyCoupon", authMiddleware, applyCoupon); // Áp dụng mã giảm giá

module.exports = router;
