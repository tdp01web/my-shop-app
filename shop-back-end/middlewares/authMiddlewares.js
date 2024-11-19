const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer ")) {
    token = req.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        if (!user) {
          res.status(401);
          throw new Error("User not found");
        }
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Token not found");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("No token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "Admin" && adminUser.role !== "Owner") {
    throw new Error("Bạn không có quyển truy cập");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
