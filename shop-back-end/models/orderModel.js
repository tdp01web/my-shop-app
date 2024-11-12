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
    }, // Số tiền giảm giá (nếu có mã giảm giá được áp dụng)
    couponDiscountDetails: {
      discount: { type: Number, default: 0 }, // Phần trăm giảm giá
      maxDiscountAmount: { type: Number, default: 0 }, // Số tiền giảm tối đa
      discountAmount: { type: Number, default: 0 }, // Số tiền được giảm
    },
    shippingFee: {
      type: Number,
      required: true,
    }, // Phí vận chuyển
    totalPrice: {
      type: Number,
      required: true,
    }, // Tổng số tiền phải thanh toán (bao gồm vận chuyển và giảm giá)

    // Thông tin giao hàng
    shippingAddress: {
      name: {
        type: String,
        required: true,
      }, // Tên người nhận hàng
      phone: {
        type: String,
        required: true,
      }, // Số điện thoại người nhận hàng
      addressLine1: {
        type: String,
        required: true,
      }, // Địa chỉ giao hàng (đường/phố)
      city: {
        type: String,
        required: true,
      }, // Tỉnh/thành phố
      district: {
        type: String,
        required: true,
      }, // Quận/huyện
      ward: {
        type: String,
        required: true,
      }, // Phường/xã
      postalCode: {
        type: String,
        required: false,
      }, // Mã bưu điện (nếu có)
    },

    // Trạng thái thanh toán và đơn hàng
    paymentMethod: {
      type: String,
      enum: ["Thanh Toán Khi Nhận Hàng", "MOMO"],
      required: true,
    }, // Phương thức thanh toán
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
    }, // Trạng thái thanh toán của đơn hàng
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
      }, // yêu cầu lý do khi hủy đơn
    },
    cancellationReason: {
      type: String,
    }, // Lý do hủy đơn hàng

    // Thông tin thêm
    paymentIntent: {}, // Tùy chọn: Dùng để lưu thông tin thanh toán (nếu dùng Stripe hoặc các cổng thanh toán khác)
  },
  {
    timestamps: true, // Tự động thêm thời gian tạo và cập nhật
  }
);

module.exports = mongoose.model("Order", orderSchema);
