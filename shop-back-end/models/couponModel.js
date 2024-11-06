const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  }, // Tên mã giảm giá
  expiry: {
    type: Date,
    required: true,
  }, // ngày hết hạn
  discount: {
    type: Number,
    required: true,
  }, // Số tiền giảm
  startDate: {
    type: Date,
    required: true, // Ngày bắt đầu có thể sử dụng mã giảm giá
  },
  maxDiscountAmount: {
    type: Number,
    required: true, // Số tiền giảm tối đa
  },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Danh sách người dùng đã sử dụng mã giảm giá
});

module.exports = mongoose.model("Coupon", couponSchema);
