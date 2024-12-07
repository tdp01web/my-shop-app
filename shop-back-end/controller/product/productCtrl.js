const Product = require("../../models/product/productModel");
const ProductVariant = require("../../models/product/productVariantModel");
const Brand = require("../../models/product/brandModel");
const Category = require("../../models/product/prodcategoryModel");
const Order = require("../../models/orderModel");
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
      status,
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
      status,
    });

    // Thêm các biến thể cho sản phẩm
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        const {
          ram,
          storage,
          processor,
          gpu,
          quantity,
          price,
          images,
          attributes,
        } = variant;

        const productVariant = await ProductVariant.create({
          product: product._id,
          ram,
          storage,
          processor,
          gpu,
          quantity,
          price,
          images,
          status,
          attributes,
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
      variants,
    } = req.body;

    // Tìm sản phẩm theo `id`
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Cập nhật các thông tin sản phẩm
    product.title = title || product.title;
    product.slug = slugify(title) || product.slug;
    product.description = description || product.description;
    product.basePrice = basePrice || product.basePrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.lcd = lcd || product.lcd;

    if (Array.isArray(images) && images.length > 0) {
      const newImagesMap = new Map(images.map((img) => [img.public_id, img]));

      // Xóa ảnh cũ không có trong danh sách ảnh mới
      product.images = product.images.filter((oldImage) =>
        newImagesMap.has(oldImage.public_id)
      );

      // Thêm các ảnh mới vào danh sách ảnh của sản phẩm
      images.forEach((newImage) => {
        if (
          !product.images.some((img) => img.public_id === newImage.public_id)
        ) {
          product.images.push({
            public_id: newImage.public_id,
            url: newImage.url,
          });
        }
      });
    }

    const newVariantIds = [];

    if (Array.isArray(variants) && variants.length > 0) {
      for (const variant of variants) {
        const {
          _id,
          ram,
          storage,
          processor,
          gpu,
          quantity,
          price,
          attributes,
        } = variant;

        if (_id && mongoose.Types.ObjectId.isValid(_id)) {
          const existingVariant = await ProductVariant.findById(_id);
          if (existingVariant) {
            existingVariant.ram = ram || existingVariant.ram;
            existingVariant.storage = storage || existingVariant.storage;
            existingVariant.processor = processor || existingVariant.processor;
            existingVariant.gpu = gpu || existingVariant.gpu;
            existingVariant.quantity = quantity || existingVariant.quantity;
            existingVariant.price = price || existingVariant.price;
            existingVariant.attributes =
              attributes || existingVariant.attributes;

            await existingVariant.save();
            newVariantIds.push(existingVariant._id);
          }
        } else {
          const newVariant = await ProductVariant.create({
            product: product._id,
            ram,
            storage,
            processor,
            gpu,
            quantity,
            price,
            attributes,
          });

          newVariantIds.push(newVariant._id);
        }
      }
    }

    // Cập nhật mảng `variants` của sản phẩm
    product.variants = newVariantIds;
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Xóa sản phẩm
// const deleteProduct = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Tìm và xóa sản phẩm cùng với các biến thể
//     const product = await Product.findByIdAndDelete(id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Xóa tất cả các biến thể liên quan đến sản phẩm này
//     await ProductVariant.deleteMany({ product: product._id });

//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const brand = await Brand.findById(product.brand);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    if (brand.status === 0) {
      return res.status(400).json({
        message: "Cannot modify product because the brand is suspended.",
      });
    }

    const category = await Category.findById(product.category);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (category.status === 0) {
      return res.status(400).json({
        message: "Cannot modify product because the category is suspended.",
      });
    }

    product.status = product.status === 1 ? 0 : 1;
    const updatedProduct = await product.save();

    await ProductVariant.updateMany({ product: product._id }, { status: 0 });

    await Product.updateMany({ product: product._id }, { statusCmt: 0 });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const brand = await Brand.findById(product.brand);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    if (brand.status === 0) {
      return res.status(400).json({
        message: "Cannot modify product because the brand is suspended.",
      });
    }

    const category = await Category.findById(product.category);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (category.status === 0) {
      return res.status(400).json({
        message: "Cannot modify product because the category is suspended.",
      });
    }

    product.statusCmt = product.statusCmt === 1 ? 0 : 1;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteCommentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params; // id là ID của bình luận
  try {
    const product = await Product.findOne({ "ratings._id": id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const ratingIndex = product.ratings.findIndex(
      (rating) => rating._id.toString() === id
    );
    if (ratingIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    product.ratings[ratingIndex].isClose =
      product.ratings[ratingIndex].isClose === 1 ? 0 : 1;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//! Lấy chi tiết sản phẩm
const getaProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Tăng lượt xem
    await Product.findByIdAndUpdate(id, { $inc: { views: 1 } });

    // Lấy sản phẩm
    const product = await Product.findById(id)
      .populate("category")
      .populate("brand")
      .populate("lcd")
      .populate({
        path: "variants",
        populate: ["ram", "storage", "processor", "gpu"],
      });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
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
      status: 1,
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

const getReviewsUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Tìm sản phẩm theo id
    const product = await Product.findById(id).populate({
      path: "ratings.postedby",
      select: "firstName lastName email",
    });

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
    }

    // Lọc các bình luận có isClose = 1
    const closedComments = product.ratings.filter(
      (rating) => rating.isClose === 1
    );

    // Trả về danh sách các bình luận  (isClose = 1)
    res.status(200).json({ closedComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

const getProductComments = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate({
      path: "ratings.postedby", //
      select: "firstName lastName email",
    });

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
    }

    // Trả về danh sách ratings đã populate
    res.status(200).json({ ratings: product.ratings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//update biến thể sản phẩm
const updateProductVariant = asyncHandler(async (req, res) => {
  try {
    const { variantId } = req.params;
    const { ram, storage, processor, gpu, quantity, price, images } = req.body;

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

const getAllProductComments = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .select("id title ratings statusCmt") // Chỉ lấy trường cần thiết
      .populate({
        path: "ratings.postedby",
        select: "firstName lastName email", // Lấy thông tin cần thiết từ người dùng
      })
      .sort({ "ratings.createdAt": -1 }); // Sắp xếp bình luận mới nhất

    const result = products.map((product) => {
      const totalStars = product.ratings.reduce(
        (sum, rating) => sum + (rating.star || 0),
        0
      );
      const averageRating =
        product.ratings.length > 0
          ? (totalStars / product.ratings.length).toFixed(1)
          : 0; // Tính trung bình sao, làm tròn 1 chữ số thập phân

      return {
        id: product.id,
        productTitle: product.title,
        totalComments: product.ratings.length,
        averageRating: parseFloat(averageRating), // Thay `totalRatings` bằng `averageRating`
        latestCommentDate: product.ratings.length
          ? product.ratings[0].createdAt
          : null,
        statusCmt: product.statusCmt,
        ratings: product.ratings.map((rating) => ({
          id: rating.id,
          star: rating.star,
          comment: rating.comment, // Nội dung bình luận
          user: rating.postedby
            ? `${rating.postedby.firstName} ${rating.postedby.lastName}`
            : "Unknown",
          email: rating.postedby ? rating.postedby.email : "Unknown",
          date: rating.createdAt,
          isClose: rating.isClose,
        })),
      };
    });

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu bình luận!" });
  }
});

const deleteProductVariant = asyncHandler(async (req, res) => {
  const { variantId } = req.params;
  try {
    const productVariant = await ProductVariant.findById(variantId);
    if (!productVariant) {
      return res.status(404).json({ message: "ProductVariant not found" });
    }
    const product = await Product.findById(productVariant.product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.status === 0) {
      return res.status(400).json({
        message: "Cannot activate variant because the product is suspended.",
      });
    }

    productVariant.status = productVariant.status === 1 ? 0 : 1;
    const updatedProductVariant = await productVariant.save();

    res.json(updatedProductVariant);
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

const getAllProductsForUsers = asyncHandler(async (req, res) => {
  try {
    // Lọc chỉ các sản phẩm có status = 1
    const products = await Product.find({ status: 1 })
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

//top 5 sản phẩm bán chạy user
const getTopSellingProductsUsers = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ status: 1 })
      .sort({ sold: -1 })
      .limit(5)
      .populate({
        path: "variants",
        populate: [
          { path: "ram", select: "size" },
          { path: "storage", select: "name" },
          { path: "processor", select: "name" },
          { path: "gpu", select: "name" },
        ],
      });

    res.status(200).json({
      message: "Top 5 sản phẩm bán chạy nhất không bị đình chỉ",
      products,
    });
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    res.status(500).json({ message: error.message });
  }
});

const getTopSellingProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ sold: -1 })
      .limit(5)
      .populate({
        path: "variants",
        populate: [
          { path: "ram", select: "size" },
          { path: "storage", select: "name" },
          { path: "processor", select: "name" },
          { path: "gpu", select: "name" },
        ],
      });

    res.status(200).json({
      message: "Top 5 sản phẩm bán chạy nhất",
      products,
    });
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    res.status(500).json({ message: error.message });
  }
});

//Lấy danh sách sản phẩm theo lượt bán giảm dần
const getProductsBySales = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ sold: -1 }); // Sắp xếp lượt bán giảm dần

    res.status(200).json({
      message: "Danh sách sản phẩm theo lượt bán giảm dần",
      products,
    });
  } catch (error) {
    console.error("Error fetching products by sales:", error);
    res.status(500).json({ message: error.message });
  }
});

//Lấy danh sách sản phẩm theo lượt xem giảm dần
const getProductsByViews = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ views: -1 }); // Sắp xếp lượt xem giảm dần

    res.status(200).json({
      message: "Danh sách sản phẩm theo lượt xem giảm dần",
      products,
    });
  } catch (error) {
    console.error("Error fetching products by views:", error);
    res.status(500).json({ message: error.message });
  }
});

//! Đánh giá sản phẩm
const rateProduct = asyncHandler(async (req, res) => {
  const { prodId, star, comment } = req.body;
  const { _id: userId } = req.user;

  try {
    // Kiểm tra sản phẩm có tồn tại
    const product = await Product.findById(prodId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    // Kiểm tra người dùng đã mua sản phẩm hay chưa
    const completedOrders = await Order.find({
      orderedBy: userId,
      "products.prodId": prodId,
      orderStatus: "Hoàn Thành",
    });

    if (!completedOrders || completedOrders.length === 0) {
      return res
        .status(403)
        .json({ message: "Bạn chỉ có thể đánh giá sản phẩm đã mua" });
    }

    // Lấy danh sách orderId đã được đánh giá
    const ratedOrderIds = product.ratings
      .filter((rating) => rating.postedby.toString() === userId.toString())
      .map((rating) => rating.orderId?.toString());

    // Lọc các đơn hàng chưa được đánh giá
    const unratedOrders = completedOrders.filter(
      (order) => !ratedOrderIds.includes(order._id.toString())
    );

    if (unratedOrders.length === 0) {
      return res
        .status(403)
        .json({ message: "Bạn đã đánh giá tất cả các lần mua" });
    }

    // Lấy orderId đầu tiên trong danh sách chưa đánh giá
    const targetOrder = unratedOrders[0];

    // Thêm đánh giá mới cho lần mua chưa được đánh giá
    product.ratings.push({
      star,
      comment,
      orderId: targetOrder._id,
      postedby: userId,
    });

    // Tính lại trung bình số sao
    const totalStars = product.ratings.reduce(
      (acc, rating) => acc + rating.star,
      0
    );

    product.totalrating = (totalStars / product.ratings.length).toFixed(1);
    await product.save();

    res.status(200).json({ message: "Đánh giá sản phẩm thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

const getLatestProducts = asyncHandler(async (req, res) => {
  try {
    const latestProducts = await Product.find()
      .populate("category")
      .populate("brand")
      .populate("lcd")
      .populate({
        path: "variants",
        populate: ["ram", "storage", "processor", "gpu"],
      })
      .sort({ createdAt: -1 }) // Sắp xếp theo trường createdAt, giảm dần (mới nhất trước)
      .limit(6); // Lấy tối đa 6 sản phẩm

    res.status(200).json(latestProducts);
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
  getAllProductsForUsers,
  getProductComments,
  getAllProductComments,
  deleteComment,
  deleteCommentDetail,
  getTopSellingProducts,
  getProductsBySales,
  getProductsByViews,
  getTopSellingProductsUsers,
  getReviewsUser,
  getLatestProducts
};
