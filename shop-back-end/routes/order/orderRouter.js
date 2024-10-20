const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require("../../controller/order/order");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddleware, createOrder); // Order sản phẩm

// Lấy tất cả đơn hàng của người dùng
router.get("/", authMiddleware, getUserOrders);

// Lấy chi tiết một đơn hàng cụ thể
router.get("/:orderId", authMiddleware, getOrderById);

module.exports = router;
