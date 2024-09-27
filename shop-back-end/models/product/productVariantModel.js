const mongoose = require("mongoose");

var productVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    }, // Liên kết tới sản phẩm chính
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
    ram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RAM",
      required: true,
    },
    storage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      required: true,
    },
    processor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Processor",
      required: true,
    },
    gpu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GPU",
    },
    lcd: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LCD",
    },
    quantity: {
      type: Number,
      required: true,
    }, // Số lượng cho biến thể này
    price: {
      type: Number,
      required: true,
    }, // Giá riêng cho biến thể này nếu khác với giá cơ bản
    images: [
      {
        public_id: String,
        url: String,
      },
    ], // Hình ảnh riêng cho biến thể nếu cần
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductVariant", productVariantSchema);
