const mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      // required: true,
    },
    lcd: {
      type: String,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
      },
    ], // liên kết tới bảng ProductVariant để quản lý các biến thể
    ratings: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        star: Number,
        comment: String,
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
        isClose: {
          type: Number,
          enum: [0, 1],
          default: 1,
        },
      },
    ],
    totalrating: {
      type: Number,
      default: 0,
    },
    statusCmt: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    views: {
      type: Number,
      default: 0, // Lượt xem
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
