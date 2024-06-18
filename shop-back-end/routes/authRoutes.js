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
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");

//! Đăng ký
router.post("/register", createUser);
//! Đăng nhập
router.post("/login", loginUserCtrl);
//! mã xác nhận
router.post("/forgot-password-token", forgotPasswordToken);
//!resetPassword
router.put("/reset-password/:token", resetPassword);
//! Lấy all users
router.get("/all-user", getallUser);
//! Lấy thông tin user
router.get("/getUser/:id", authMiddleware, getaUser);
//!  Đăng xuất
router.get("/logout", logout);
//! Gia hạn token
router.get("/refresh", handleRefreshToken);
//! Update user
router.put("/updateUser", authMiddleware, updatedUser);
//! Khóa tài khoản user
router.put("/blockUser/:id", authMiddleware, isAdmin, blockUser);
//! Mở tài khoản user
router.put("/unblockUser/:id", authMiddleware, isAdmin, unblockUser);
//! Đổi mật khẩu
router.put("/updatePassword", authMiddleware, updatePassword);
//! Xóa user
router.delete("/deleteUser/:id", deleteUser);
module.exports = router;
