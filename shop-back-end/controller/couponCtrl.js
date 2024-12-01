const Coupon = require("../models/couponModel");
const asyncHandle = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

//! Tạo mã giảm giá
const createCoupon = asyncHandle(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//! lấy toàn bộ mã giảm giá
const getAllCouponsForUser = asyncHandle(async (req, res) => {
  const userId = req.user._id; // Lấy userId từ token
  validateMongoDbId(userId);

  try {
    const now = new Date();

    const coupons = await Coupon.find({
      status: 1, // Đang hoạt động
      startDate: { $lte: now }, // Đã bắt đầu
      expiry: { $gte: now }, // Chưa hết hạn
      usedBy: { $ne: userId }, // Loại trừ mã user đã sử dụng
    });

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getCoupon = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCoupon = await Coupon.findById(id);
    res.json(getCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//! update mã giảm giá
const updateCoupon = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//! delete mà giảm giá
const deleteCoupon = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCoupon = await Coupon.findById(id);
    if (!deleteCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    deleteCoupon.status = deleteCoupon.status === 1 ? 0 : 1;
    const updateCoupon = await deleteCoupon.save();
    res.json(updateCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCouponsForAdmin = asyncHandle(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createCoupon,
  getAllCouponsForUser,
  updateCoupon,
  deleteCoupon,
  getCoupon,
  getAllCouponsForAdmin,
};
