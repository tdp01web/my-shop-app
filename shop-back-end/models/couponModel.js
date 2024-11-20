const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  maxDiscountAmount: {
    type: Number,
    required: true,
  },
  maxUses: {
    type: Number,
    required: true,
  },
  usedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: Number,
    enum: [0, 1], // 0: Không hoạt động, 1: Hoạt động
    default: 0,
  },
});

// Middleware trước khi đọc dữ liệu
couponSchema.pre("find", function (next) {
  this.model.updateStatus();
  next();
});

couponSchema.pre("findOne", function (next) {
  this.model.updateStatus();
  next();
});

// Hàm tĩnh để tự động cập nhật trạng thái
couponSchema.statics.updateStatus = async function () {
  const now = new Date();

  // Cập nhật mã chưa đến ngày sử dụng
  await this.updateMany(
    { startDate: { $gt: now }, status: 1 }, // Mã chưa bắt đầu nhưng đang được bật
    { $set: { status: 0 } }
  );

  // Cập nhật mã đến thời gian sử dụng
  await this.updateMany(
    { startDate: { $lte: now }, expiry: { $gt: now }, status: 0 },
    { $set: { status: 1 } }
  );

  // Cập nhật mã hết hạn
  await this.updateMany(
    { expiry: { $lte: now }, status: 1 },
    { $set: { status: 0 } }
  );
};

module.exports = mongoose.model("Coupon", couponSchema);
