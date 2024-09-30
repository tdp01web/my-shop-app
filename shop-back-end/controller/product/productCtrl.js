const Product = require("../../models/product/productModel");
const ProductVariant = require("../../models/product/productVariantModel");
const Brand = require("../../models/product/brandModel");
const Color = require("../../models/product/colorModel");
const RAM = require("../../models/product/ramModel");
const Storage = require("../../models/product/storageModel");
const GPU = require("../../models/product/gpuModel");
const Processor = require("../../models/product/processorModel");
const Category = require("../../models/product/prodcategoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

//! Thêm sản phẩm mới
const createProduct = asyncHandler(async (req, res) => {
  try {
    const { title, description, basePrice, category, brand, images, variants } =
      req.body;

    // Tạo product mới
    const product = await Product.create({
      title,
      slug: slugify(title), // Tạo slug từ title
      description,
      basePrice,
      category,
      brand: brand,
      images,
    });

    // Thêm các biến thể cho sản phẩm
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        const {
          color,
          ram,
          storage,
          processor,
          gpu,
          lcd,
          quantity,
          price,
          images,
        } = variant;

        const productVariant = await ProductVariant.create({
          product: product._id,
          color,
          ram,
          storage,
          processor,
          gpu,
          lcd,
          quantity,
          price,
          images,
        });

        product.variants.push(productVariant._id);
      }

      await product.save(); // Lưu lại sản phẩm sau khi thêm biến thể
    }

    res.status(201).json(product); // Trả về thông tin sản phẩm
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Cập nhật sản phẩm
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // ID của sản phẩm cần cập nhật
    const { title, description, basePrice, category, brand, images, variants } =
      req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = title || product.title;
    product.slug = slugify(title) || product.slug;
    product.description = description || product.description;
    product.basePrice = basePrice || product.basePrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.images = images || product.images;

    // Cập nhật các biến thể nếu có
    if (variants && variants.length > 0) {
      product.variants = []; // Reset danh sách biến thể hiện tại

      for (const variant of variants) {
        const {
          color,
          ram,
          storage,
          processor,
          gpu,
          lcd,
          quantity,
          price,
          images,
        } = variant;

        const productVariant = await ProductVariant.create({
          product: product._id,
          color,
          ram,
          storage,
          processor,
          gpu,
          lcd,
          quantity,
          price,
          images,
        });

        product.variants.push(productVariant._id);
      }
    }

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Xóa sản phẩm
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm và xóa sản phẩm cùng với các biến thể
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Xóa tất cả các biến thể liên quan đến sản phẩm này
    await ProductVariant.deleteMany({ product: product._id });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Lấy chi tiết sản phẩm
const getaProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("category")
      .populate("brand")
      .populate({
        path: "variants",
        populate: ["color", "ram", "storage", "processor", "gpu", "lcd"],
      });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Lấy danh sách sản phẩm
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("brand")
      .populate({
        path: "variants",
        populate: ["color", "ram", "storage", "processor", "gpu", "lcd"],
      });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Thêm vào danh sách yêu thích
const addToWishlist = asyncHandler(async (req, res) => {
  const { prodId } = req.body;
  const { _id } = req.user; // Lấy thông tin người dùng đã đăng nhập

  try {
    const user = await User.findById(_id);

    const alreadyAdded = user.wishlist.includes(prodId);
    if (alreadyAdded) {
      // Nếu đã có trong wishlist, xóa sản phẩm khỏi danh sách yêu thích
      user.wishlist = user.wishlist.filter((id) => id.toString() !== prodId);
      await user.save();
      res
        .status(200)
        .json({ message: "Removed from wishlist", wishlist: user.wishlist });
    } else {
      // Nếu chưa có, thêm vào wishlist
      user.wishlist.push(prodId);
      await user.save();
      res
        .status(200)
        .json({ message: "Added to wishlist", wishlist: user.wishlist });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Đánh giá cho sản phẩm
const rateProduct = asyncHandler(async (req, res) => {
  const { star, prodId, comment } = req.body;
  const { _id } = req.user; // Lấy thông tin người dùng đã đăng nhập

  try {
    const product = await Product.findById(prodId);

    // Kiểm tra xem người dùng đã đánh giá sản phẩm này chưa
    const existingRating = product.ratings.find(
      (rating) => rating.postedby.toString() === _id.toString()
    );

    if (existingRating) {
      // Nếu đã đánh giá, cập nhật lại đánh giá
      existingRating.star = star;
      existingRating.comment = comment;
    } else {
      // Nếu chưa đánh giá, thêm đánh giá mới
      product.ratings.push({ star, comment, postedby: _id });
    }

    // Tính tổng số sao đánh giá và cập nhật tổng rating
    const totalRating = product.ratings.length;
    const sumRating = product.ratings.reduce((acc, curr) => acc + curr.star, 0);
    product.totalrating = sumRating / totalRating;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rateProduct,
};