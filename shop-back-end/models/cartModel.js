const mongoose = require("mongoose");

// Giỏ hàng Schema
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        count: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    cartTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAfterDiscount: {
      type: Number,
      default: 0,
    },
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appliedCoupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Tính tổng giỏ hàng
cartSchema.methods.calculateCartTotal = async function () {
  const Product = mongoose.model("Product");
  let cartTotal = 0;

  for (let item of this.products) {
    const product = await Product.findById(item.product);
    const variant = await mongoose
      .model("ProductVariant")
      .findById(item.variant);

    // Kiểm tra nếu sản phẩm bị ẩn (status = 1) hoặc hết hàng (quantity = 0)
    if (product.status === 1 || !variant || variant.quantity === 0) {
      item.unavailable = true; // Đánh dấu là không khả dụng
    } else {
      item.unavailable = false; // Sản phẩm khả dụng
      cartTotal += item.count * item.price; // Tính tổng giá nếu khả dụng
    }
  }

  this.cartTotal = cartTotal;
  this.totalAfterDiscount = cartTotal; // Cập nhật giá sau giảm giá
  await this.save();
};

// Cập nhật giá của sản phẩm dựa trên biến thể hiện tại
cartSchema.methods.updatePrices = async function () {
  const ProductVariant = mongoose.model("ProductVariant");
  const Product = mongoose.model("Product");

  for (let item of this.products) {
    const product = await Product.findById(item.product);
    const variant = await ProductVariant.findById(item.variant);

    // Nếu sản phẩm hoặc biến thể không tồn tại, hoặc không khả dụng
    if (
      !product ||
      product.status === 1 ||
      !variant ||
      variant.quantity === 0
    ) {
      item.unavailable = true;
      item.price = 0; // Đặt giá = 0 nếu sản phẩm không khả dụng
    } else {
      item.unavailable = false;
      item.price = variant.price; // Cập nhật giá từ biến thể hiện tại
    }
  }

  await this.calculateCartTotal();
};

// Thêm sản phẩm vào giỏ hàng
cartSchema.methods.addProductToCart = async function (
  productId,
  variantId,
  count = 1
) {
  const product = await mongoose.model("Product").findById(productId);
  const variant = await mongoose.model("ProductVariant").findById(variantId);

  if (!product || !variant || variant.quantity <= 0) {
    throw new Error("Sản phẩm hoặc biến thể không khả dụng hoặc đã hết hàng.");
  }

  const existingProductIndex = this.products.findIndex(
    (item) =>
      item.product.toString() === productId.toString() &&
      item.variant.toString() === variantId.toString()
  );

  if (existingProductIndex !== -1) {
    // Sản phẩm đã có trong giỏ, tăng số lượng
    this.products[existingProductIndex].count += count;
  } else {
    // Thêm sản phẩm mới vào giỏ hàng
    this.products.push({
      product: productId,
      variant: variantId,
      price: variant.price, // Lấy giá từ biến thể
      count: count,
    });
  }

  await this.calculateCartTotal(); // Cập nhật tổng tiền sau khi thêm sản phẩm
  await this.save();
};

// Lấy giỏ hàng và cập nhật giá theo biến thể hiện tại
cartSchema.statics.findCartAndUpdatePrices = async function (cartId) {
  const cart = await this.findById(cartId)
    .populate("products.product")
    .populate("products.variant");

  if (!cart) {
    throw new Error("Không tìm thấy giỏ hàng.");
  }

  // Cập nhật giá của sản phẩm trong giỏ hàng nếu giá biến thể thay đổi
  await cart.updatePrices();

  return cart;
};

cartSchema.methods.applyCoupon = async function (coupon) {
  const discountAmount = Math.min(
    (this.cartTotal * coupon.discount) / 100,
    coupon.maxDiscountAmount
  );

  this.totalAfterDiscount = this.cartTotal - discountAmount; // Trừ trực tiếp vào giỏ hàng
  this.appliedCoupon = coupon._id; // Lưu mã giảm giá đã áp dụng

  await this.save(); // Lưu lại giỏ hàng sau khi áp dụng giảm giá
};

// Hủy mã giảm giá
cartSchema.methods.cancelCoupon = async function () {
  this.appliedCoupon = null; // Xóa mã giảm giá
  this.totalAfterDiscount = this.cartTotal; // Đặt lại tổng tiền sau giảm giá

  await this.save();
};

module.exports = mongoose.model("Cart", cartSchema);
