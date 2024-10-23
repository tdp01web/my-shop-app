const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateStatus,
  cancelOrderForAdmin,
  cancelOrderForUser,
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

// Cập nhật địa chỉ đơn hàng nếu chưa xác nhận

// Cập nhật trạng thái đơn hàng (chỉ dành cho admin)
router.put("/update-status/:orderId", authMiddleware, isAdmin, updateStatus);

// hủy đơn hàng cho admin
router.put(
  "/cancel-admin/:orderId",
  authMiddleware,
  isAdmin,
  cancelOrderForAdmin
);

// Hủy đơn hàng cho người dùng
router.put("/cancel-user/:orderId", authMiddleware, cancelOrderForUser);

module.exports = router;
