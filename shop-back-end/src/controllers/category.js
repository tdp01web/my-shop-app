import Category from "../models/category.js";
import Product from "../models/product.js";
import categorySchema from "../validates/category.js";

export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find().populate("products");
        if (categories.length === 0) {
            return res.json({
                message: "Không có danh mục nào",
            });
        }
        return res.status(200).json({ 
            message: "thành công",
            data: categories
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const getOneCategory = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id).populate("products");
        if (!category) {
            return res.json({
                message: "Không có danh mục nào",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const createCategory = async function (req, res) {
    try {
        const { error } = categorySchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const { name } = req.body
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(404).json({
                message: "danh mục đã tồn tại",
            });
        }
        const category = await Category.create(req.body);
        if (!category) {
            return res.status(404).json({
                message: "Không thêm được danh mục",
            });
        }
        return res.status(200).json({
            message: "Thêm danh mục thành công",
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const updateCategory = async function (req, res) {
    try {
        const { name } = req.body
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(404).json({
                message: "danh mục đã tồn tại",
            });
        }
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({
                message: "Cập nhật danh mục không thành công",
            });
        }
        return res.status(200).json({
            message: "Cập nhật danh mục thành công",
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const removeCategory = async function (req, res) {
    try {
        // Xoá danh mục và sản phẩm liên quan
        const categories = await Category.findByIdAndDelete(req.params.id)
        if (!categories) {
            return res.status(404).json({
                message: "Xóa danh mục thất bại",
            });
        } else {
            const product = await Product.deleteMany({ CategoryId: req.params.id })
            if (!product) {
                return res.status(404).json({
                    message: "Xóa sản phẩm liên quan thất bại",
                });
            } else {
                return res.status(200).json({
                    message: "Đã xoá danh mục và sản phẩm liên quan thành công!",
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
