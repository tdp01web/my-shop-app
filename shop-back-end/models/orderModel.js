const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema(
  {
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        prodId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Thêm ID sản phẩm
        title: String,
        slug: String,
        description: String,
        category: String,
        brand: String,
        lcd: String,
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
        ],
        ram: String,
        storage: String,
        processor: String,
        gpu: String,
        price: Number,
        quantity: Number,
        count: {
          type: Number,
          required: true,
        },
      },
    ],
    totalProductPrice: {
      type: Number,
      required: true,
    }, // Tổng giá của các sản phẩm trước phí vận chuyển hoặc giảm giá
    discountApplied: {
      type: Number,
      default: 0,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
      postalCode: { type: String, required: false },
    },
    paymentMethod: {
      type: String,
      enum: ["Thanh Toán Khi Nhận Hàng", "MOMO"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: [
        "Đang Xử lý",
        "Chờ Thanh Toán",
        "Chưa Thanh Toán",
        "Đã Thanh Toán",
        "Hoàn Tiền",
      ],
      default: "Chưa Thanh Toán",
    },
    orderStatus: {
      type: String,
      default: "Đang Xử Lý",
      enum: [
        "Đang Xử Lý",
        "Đã Xác Nhận",
        "Đang Đóng Gói",
        "Đang Giao Hàng",
        "Đã Giao Hàng",
        "Hoàn Thành",
        "Đã Hủy",
      ],
    },
    cancellationReason: {
      type: String,
      required: function () {
        return this.orderStatus === "Đã Hủy";
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
