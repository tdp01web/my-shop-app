const { generateToken } = require("../config/jwtToken");
const uniqid = require("uniqid");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const sendEmail = require("./emailCtl");
const crypto = require("crypto");
const Product = require("../models/product/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const bcrypt = require("bcrypt");

//! Register
const createUser = asyncHandler(async (req, res) => {
  const { email, mobile } = req.body;

  // Check if the email already exists
  const findUserByEmail = await User.findOne({ email });
  if (findUserByEmail) {
    throw new Error("Tài khoản với email này đã tồn tại");
  }

  // Check if the mobile number already exists
  const findUserByMobile = await User.findOne({ mobile });
  if (findUserByMobile) {
    throw new Error("Số điện thoại này đã tồn tại");
  }

  // Create a new user if neither email nor mobile number exists
  const newUser = await User.create(req.body);
  res.json(newUser);
});
//! Login
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new Error("Tài khoản không tồn tại");
  }

  // Check if the user is blocked
  if (findUser.status === 0 && findUser.role !== "Owner") {
    throw new Error(
      "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên."
    );
  }

  // Check if the password matches
  if (await findUser.isPasswordMatched(password)) {
    const refreshToken = await generateRefreshToken(findUser._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      { refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000, // 3 days
    });

    res.json({
      _id: findUser._id,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      mobile: findUser.mobile,
      role: findUser.role,
      email: findUser.email,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("Tài khoản mật khẩu không chính xác");
  }
});


//! handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in cookie");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with the refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

const toggleUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    // If the current role is "admin" and we want to switch to "user", ensure there's at least one other admin
    if (user.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });

      if (adminCount <= 1) {
        throw new Error("Phải có ít nhất một tài khoản admin.");
      }
    }

    // Toggle role
    const newRole = user.role === "admin" ? "user" : "admin";
    user.role = newRole;
    await user.save();

    res.json({
      message: `Vai trò người dùng đã được thay đổi thành ${newRole}`,
      role: newRole,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//! Get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//! Get a user
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaUser = await User.findById(id);
    res.json(getaUser);
  } catch (error) {
    throw new Error(error);
  }
});

//! Update user
const updatedUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        mobile: req?.body?.mobile,
        email: req?.body?.email,
        password: req?.body?.password,
        address: req?.body?.address,
        role: req?.body?.role,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//! Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findById(id);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    deleteUser.status = deleteUser.status === 1 ? 0 : 1;
    const updateUser = await deleteUser.save();
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//! Block user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

//! Unblock user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//! Logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in cookie");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken: refreshToken }, // Đối tượng filter
    { refreshToken: "" }, // Đối tượng cập nhật
    { new: true } // Tùy chọn để trả về tài liệu cập nhật mới nhất
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    screen: true,
  });

  return res.sendStatus(204);
});

//! Update password
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user; // ID người dùng từ xác thực
  const { currentPassword, newPassword } = req.body; // Mật khẩu hiện tại và mật khẩu mới từ request body

  validateMongoDbId(_id);

  const user = await User.findById(_id);
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }

  // Kiểm tra mật khẩu hiện tại có khớp với mật khẩu đã mã hóa trong DB
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
  }

  // Cập nhật mật khẩu mới nếu kiểm tra hợp lệ
  if (newPassword) {
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
  } else {
    res.status(400).json({ message: "Cần nhập mật khẩu mới" });
  }
});

//! mã thông báo
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset your password.
    This link is valid till 10 minutes from now.
    <a href='http://localhost:5173/forgot-password/${token}'>Click here</a>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token is invalid or has expired");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

//! Admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check user có tồn tại hay không
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") {
    throw new Error("Bạn không có quyền truy cập");
  }
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstName: findAdmin?.firstName,
      lastName: findAdmin?.lastName,
      mobile: findAdmin?.mobile,
      email: findAdmin?.email,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Tài khoản mật khẩu không chính xác");
  }
});

//! lấy ra danh sách yêu thích
const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).populate({
      path: "wishlist",
      populate: [
        {
          path: "variants",
          populate: [
            { path: "processor" },
            { path: "gpu" },
            { path: "ram" },
            { path: "storage" },
          ],
        },
      ],
    });

    // Kiểm tra nếu wishlist trống
    // Nếu user hoặc wishlist không tồn tại, trả về danh sách rỗng
    if (!user || !user.wishlist || user.wishlist.length === 0) {
      return res
        .status(200)
        .json({ wishlist: [], message: "Wishlist is empty" });
    }

    // Trả về wishlist đã được populate
    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params; // Lấy id từ params
  const { firstName, lastName, email, mobile, address, role, password } =
    req.body; // Các thông tin cần cập nhật

  try {
    // Kiểm tra user có tồn tại không
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    // Cập nhật các trường được cho phép
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.address = address || user.address;
    user.role = role || user.role;
    user.password = password || user.password;

    // Lưu lại thay đổi
    const updatedUser = await user.save();

    res.status(200).json({
      message: "Cập nhật người dùng thành công.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
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
  toggleUserRole,
  updateUserByAdmin,
};
