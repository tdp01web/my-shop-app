const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateStatus,
  cancelOrderForAdmin,
  cancelOrderForUser,
  getAllOrdersForAdmin,
  handleMomoPayment,
  callback,
  cancelMyOrder,
  createOrderSales,
  deliveredOrder,
} = require("../../controller/order/order");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddleware, createOrder); // Order sản phẩm
router.post("/sales", authMiddleware, createOrderSales); //sales
// Thanh toán online
router.post("/payment", authMiddleware, handleMomoPayment);
router.post("/callback", callback);

// Lấy tất cả đơn hàng của người dùng
router.get("/", authMiddleware, getUserOrders);

// Lấy tất cả đơn hàng của tất cả người dùng
router.get("/my-orders", authMiddleware, getAllOrdersForAdmin);

// Lấy chi tiết một đơn hàng cụ thể
router.get("/:orderId", authMiddleware, getOrderById);

// Cập nhật địa chỉ đơn hàng nếu chưa xác nhận

// Cập nhật trạng thái đơn hàng (chỉ dành cho admin)
router.put("/update-status/:orderId", authMiddleware, isAdmin, updateStatus);

// người dùng huỷ đơn của mình
router.put("/my-orders/cancel/:orderId", authMiddleware, cancelMyOrder);

// cập nhật trạng thái đã hoàn thành
router.put("/my-orders/delivered/:orderId", authMiddleware, deliveredOrder);

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
