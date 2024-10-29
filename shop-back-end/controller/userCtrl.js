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
  //check user có tồn tại hay không
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
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
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      mobile: findUser?.mobile,
      role: findUser?.role,
      email: findUser?.email,
      token: generateToken(findUser?._id),
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
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
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
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

//! lưu địa chỉ người dùng
const saveUserAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      {
        address: req?.body?.address,
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

// ! Phiếu giảm giá
// const applyCoupon = asyncHandler(async (req, res) => {
//   const { coupon } = req.body;
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   const validCoupon = await Coupon.findOne({ name: coupon });
//   if (validCoupon === null) {
//     throw new Error("Invalid Coupon");
//   }
//   const user = await User.findOne({ _id });
//   let { cartTotal } = await Cart.findOne({
//     orderedBy: user._id,
//   }).populate("products.product");
//   let totalAfterDiscount = (
//     cartTotal -
//     (cartTotal * validCoupon.discount) / 100
//   ).toFixed(2);
//   await Cart.findOneAndUpdate(
//     { orderedBy: user._id },
//     { totalAfterDiscount },
//     { new: true }
//   );
//   res.json(totalAfterDiscount);
// });

const crateOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) {
      throw new Error("Tạo đơn hàng thất bại");
    }
    const user = await User.findById({ _id });
    let userCart = await Cart.findOne({ orderedBy: user._id });
    let finalAmount = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash On Delivery",
        created: Date.now(),
        currency: "vnd",
      },
      orderedBy: user._id,
      orderStatus: "Cash On Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "Đơn hàng đã được đặt thành công" });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userOrder = await Order.findOne({ orderedBy: _id })
      .populate("products.product")
      .populate("orderedBy")
      .exec();
    res.json(userOrder);
  } catch (error) {
    throw new Error(error);
  }
});

//get all order
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderedBy")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});

//! update trạng thái giỏ hàng
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
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
  saveUserAddress,
  crateOrder,
  getOrder,
  updateOrderStatus,
  getAllOrders,
};
