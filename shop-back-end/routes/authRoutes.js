const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveUserAddress,
  crateOrder,
  getOrder,
  updateOrderStatus,
  getAllOrders,
  toggleUserRole,
  updateUserByAdmin,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");

//! Đăng ký
router.post("/register", createUser);
//! Đăng nhập
router.post("/login", loginUserCtrl);
//! Đăng nhập admin
router.post("/admin-login", loginAdmin);
//! mã xác nhận
router.post("/forgot-password-token", forgotPasswordToken);
//!resetPassword
router.put("/reset-password/:token", resetPassword);
//! Lấy all users
router.get("/all-user", getallUser);
//! Lấy thông tin user
router.get("/getUser/:id", authMiddleware, getaUser);
//! Lấy dánh sách yêu thích
router.get("/getWishlist", authMiddleware, getWishlist);
//!  Đăng xuất
router.get("/logout", logout);
//! Gia hạn token
router.get("/refresh", handleRefreshToken);
//! Update user
router.put("/updateUser", authMiddleware, updatedUser);
//! Lưu địa chỉ người dùng
router.put("/saveUserAddress", authMiddleware, saveUserAddress);
//! Khóa tài khoản user
router.put("/blockUser/:id", authMiddleware, isAdmin, blockUser);
//! Mở tài khoản user
router.put("/unblockUser/:id", authMiddleware, isAdmin, unblockUser);
//! Thay đổi quyền
router.put("/toggle-role/:id", authMiddleware, isAdmin, toggleUserRole);
//! update user của admin
router.put("/update-user-admin/:id",authMiddleware, isAdmin, updateUserByAdmin);
//! Đổi mật khẩu
router.put("/updatePassword/:id", authMiddleware, updatePassword);
//! Xóa user
router.post("/deleteUser/:id", deleteUser);

//! đơn hàng
router.post("/crateOrder", authMiddleware, crateOrder);
router.get("/getOrder", authMiddleware, getOrder);
router.get("/getAllOrders", authMiddleware, isAdmin, getAllOrders);
router.put(
  "/order/updateOrderStatus/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
