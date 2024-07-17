import Category from "../models/category.js";
import productSchema from "../validates/product.js";
import Product from "../models/product.js";

//search product by name
export const SearchProductByName = async (req, res) => {
    const searchTerm = req.query.name;
    try {
        const product = await Product.find({ name: { $regex: searchTerm, $options: 'i' } })
        if (product.length === 0) {
            return res.status(404).json({
                message: "Không có sản phẩm bạn muốn tìm",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
// filter products by price
export const FilterProductByPrice = async (req, res) => {
    const { minPrice, maxPrice, sortType } = req.query;
    try {
        let products = await Product.find({
            price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
        });
        if (products.length === 0) {
            return res.status(404).json({
                message: 'Không có sản phẩm bạn muốn tìm',
            });
        }
        if (sortType === "desc") {
            products.sort((a, b) => b.price - a.price);
        } else {
            products.sort((a, b) => a.price - b.price);
        }
        return res.status(200).json({
            message: 'thành công',
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// filter products by size
export const FilterProductBySize = async (req, res) => {
    try {
        const { size } = req.params;
        const filteredProducts = await Product.find({ size: size });
        return res.status(200).json({
            message: 'Lọc sản phẩm thành công',
            data: filteredProducts,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// filter products on sale price
export const FilterProductBySalePrice = async (req, res) => {
    try {
      const saleProducts = await Product.find({
        $and: [
          { salePrice: { $gt: 0 } },
          {
            $expr: {
              $gt: [
                { $divide: [{ $subtract: ["$price", "$salePrice"] }, "$price"] },
                0.2,
              ],
            },
          },
        ],
      });
      if (saleProducts.length === 0) {
        return res.status(404).json({
          message: "Không có sản phẩm đang sale",
        });
      }
      return res.status(200).json({
        message: "thành công",
        data: saleProducts,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// filter products by categories
export const FilterProductByCategory = async (req, res) => {
    const { CategoryId } = req.query
    try {
        const products = await Product.find({
            CategoryId: CategoryId
        });
        if (products.length === 0) {
            return res.status(404).json({
                message: 'Không có sản phẩm bạn muốn tìm',
            });
        }
        return res.status(200).json({
            message: 'thành công',
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const GetallProduct = async (req, res) => {
    try {
        const product = await Product.find().populate("tags").populate("CategoryId")
        if (product.length === 0) {
            return res.status(404).json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getOneProduct = async function (req, res) {
    const productId = req.params.productId; // Lấy id của bài đăng
    try {
        const product = await Product.findById(req.params.id).populate("tags").populate("CategoryId")
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        // Tìm các bài đăng liên quan
        const relatedProducts = await Product.find({
            $and: [
                { _id: { $ne: productId } },
                { $or: [{ tags: { $in: product.tags } }, { CategoryId: product.CategoryId }] }],
        }).limit(6).populate("tags");
        // Tăng số lượt xem lên một đơn vị
        product.views++;
        await product.save();
        return res.status(200).json({
            message: "thành công",
            data: product, relatedProducts
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const CreateProduct = async function (req, res) {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const product = await Product.create(req.body);
        if (!product) {
            return res.status(404).json({
                message: "Không thể thêm sản phẩm",
            });
        }
        await Category.findByIdAndUpdate(product.CategoryId, {
            $addToSet: {
                products: product._id,
            },
        });
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const UpdateProduct = async function (req, res) {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        await Category.findByIdAndUpdate(product.CategoryId, {
            $addToSet: {
                products: product._id,
            },
        });
        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const RemoveProduct = async function (req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xóa sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};