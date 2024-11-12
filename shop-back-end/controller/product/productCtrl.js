const Product = require("../../models/product/productModel");
const ProductVariant = require("../../models/product/productVariantModel");
const Brand = require("../../models/product/brandModel");
const RAM = require("../../models/product/ramModel");
const Storage = require("../../models/product/storageModel");
const GPU = require("../../models/product/gpuModel");
const Processor = require("../../models/product/processorModel");
const Category = require("../../models/product/prodcategoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const User = require("../../models/userModel");

// Tìm kiếm sản phẩm
const searchProducts = async (req, res) => {
  const query = req.query.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm." });
  }

  try {
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    })
      .populate({
        path: "variants",
        populate: [
          { path: "ram" },
          { path: "storage" },
          { path: "processor" },
          { path: "gpu" },
        ],
      })
      .sort({ createdAt: -1 });

    if (products.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm nào." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra trong quá trình tìm kiếm." });
  }
};

//! Thêm sản phẩm mới
const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      basePrice,
      category,
      brand,
      lcd,
      images,
      variants,
    } = req.body;

    // Tạo product mới
    const product = await Product.create({
      title,
      slug: slugify(title), // Tạo slug từ title
      description,
      basePrice,
      category,
      brand,
      lcd, // lcd is now part of the main product schema
      images,
    });

    // Thêm các biến thể cho sản phẩm
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        const { ram, storage, processor, gpu, quantity, price, images } =
          variant;

        const productVariant = await ProductVariant.create({
          product: product._id,
          ram,
          storage,
          processor,
          gpu,
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

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      basePrice,
      category,
      brand,
      lcd,
      images,
      variants, // Danh sách biến thể mới hoặc cần cập nhật
    } = req.body;

    const product = await Product.findById(id).populate("variants"); // Tải các biến thể hiện có
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Cập nhật các thông tin cơ bản của sản phẩm
    product.title = title || product.title;
    product.slug = slugify(title) || product.slug;
    product.description = description || product.description;
    product.basePrice = basePrice || product.basePrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.lcd = lcd || product.lcd;
    product.images = images || product.images;

    // Cập nhật hoặc thêm mới các biến thể
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        const {
          _id,
          ram,
          storage,
          processor,
          gpu,
          quantity,
          price,
          images,
        } = variant;

        if (_id) {
          // Nếu biến thể đã tồn tại, tiến hành cập nhật
          const existingVariant = await ProductVariant.findById(_id);
          if (existingVariant) {
            existingVariant.ram = ram || existingVariant.ram;
            existingVariant.storage = storage || existingVariant.storage;
            existingVariant.processor = processor || existingVariant.processor;
            existingVariant.gpu = gpu || existingVariant.gpu;
            existingVariant.quantity = quantity || existingVariant.quantity;
            existingVariant.price = price || existingVariant.price;
            existingVariant.images = images || existingVariant.images;

            await existingVariant.save();
          }
        } else {
          // Nếu biến thể chưa tồn tại, tạo mới
          const newVariant = await ProductVariant.create({
            product: product._id,
            ram,
            storage,
            processor,
            gpu,
            quantity,
            price,
            images,
          });

          product.variants.push(newVariant._id); // Thêm biến thể mới vào sản phẩm
        }
      }
    }

    // Lưu sản phẩm với các biến thể đã cập nhật hoặc thêm mới
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
      .populate("lcd")
      .populate({
        path: "variants",
        populate: [ "ram", "storage", "processor", "gpu"],
      });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error); // Log lỗi
    res.status(500).json({ message: error.message });
  }
});

//! API lấy danh sách sản phẩm cùng danh mục (tối đa 5 sản phẩm)
const getRelatedProducts = asyncHandler(async (req, res) => {
  try {
    const { categoryId, excludeId } = req.params;

    // Tìm sản phẩm cùng category, ngoại trừ sản phẩm hiện tại
    const relatedProducts = await Product.find({
      category: categoryId,
      _id: { $ne: excludeId }, // Loại trừ sản phẩm hiện tại
    })
      .limit(5)
      .populate("brand")
      .populate("lcd")
      .populate({
        path: "variants",
        populate: ["ram", "storage", "processor", "gpu"],
      });

    res.status(200).json(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: error.message });
  }
});

//! Lấy danh sách sản phẩm
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("brand")
      .populate("lcd")
      .populate({
        path: "variants",
        populate: ["ram", "storage", "processor", "gpu"],
      });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Thêm vào danh sách yêu thích
const addToWishlist = asyncHandler(async (req, res) => {
  const { prodId } = req.body;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    const alreadyAdded = user.wishlist.includes(prodId.toString());
    if (alreadyAdded) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== prodId.toString()
      );
      await user.save();
      res.status(200).json({
        message: "Xóa khỏi danh sách yêu thích thành công",
        wishlist: user.wishlist,
      });
    } else {
      // Nếu chưa có, thêm vào wishlist
      user.wishlist.push(prodId);
      await user.save();
      res.status(200).json({
        message: "Thêm vào danh  sách yêu thích thành công",
        wishlist: user.wishlist,
      });
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

//update biến thể sản phẩm
const updateProductVariant = asyncHandler(async (req, res) => {
  try {
    const { variantId } = req.params;
    const { ram, storage, processor, gpu, quantity, price, images } =
      req.body;

    const variant = await ProductVariant.findById(variantId);
    if (!variant) {
      return res.status(404).json({ message: "Không tìm thấy biến thể" });
    }

    variant.ram = ram || variant.ram;
    variant.storage = storage || variant.storage;
    variant.processor = processor || variant.processor;
    variant.gpu = gpu || variant.gpu;
    variant.quantity = quantity || variant.quantity;
    variant.price = price || variant.price;
    variant.images = images || variant.images;

    await variant.save();
    res.status(200).json(variant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//xóa biến thể của sản phẩm
const deleteProductVariant = asyncHandler(async (req, res) => {
  try {
    const { variantId } = req.params;

    const variant = await ProductVariant.findByIdAndDelete(variantId);
    if (!variant) {
      return res.status(404).json({ message: "Không tìm thấy biến thể" });
    }

    // Xóa biến thể khỏi mảng biến thể của sản phẩm
    await Product.findByIdAndUpdate(variant.product, {
      $pull: { variants: variant._id },
    });

    res.status(200).json({ message: "Đã xóa biến thể thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Lấy danh sách tất cả các biến thể
const getAllVariants = asyncHandler(async (req, res) => {
  try {
    const variants = await ProductVariant.find()
      .populate("ram")
      .populate("storage")
      .populate("processor")
      .populate("gpu");

    res.status(200).json(variants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Lấy chi tiết một biến thể
const getVariant = asyncHandler(async (req, res) => {
  try {
    const { variantId } = req.params;
    const variant = await ProductVariant.findById(variantId)
      .populate("ram")
      .populate("storage")
      .populate("processor")
      .populate("gpu");

    if (!variant) {
      return res.status(404).json({ message: "Không tìm thấy biến thể" });
    }

    res.status(200).json(variant);
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
  getAllVariants,
  getVariant,
  updateProductVariant,
  deleteProductVariant,
  getRelatedProducts,
  searchProducts,
};
