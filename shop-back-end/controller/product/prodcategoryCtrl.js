const Category = require("../../models/product/prodcategoryModel");
const Product = require("../../models/product/productModel");
const ProductVariant = require("../../models/product/productVariantModel");
const asyncHandle = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createCategory = asyncHandle(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});


const deleteCategory = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const category = await Category.findById(id);
      if (!category) {
          return res.status(404).json({ message: "Category not found" });
      }

    category.status = category.status === 1 ? 0 : 1;
    const updatedCategory = await category.save();

    const products = await Product.find({ category: id });
    await Product.updateMany({ category: id }, { status: 0 });

    await ProductVariant.updateMany(
      { product: { $in: products.map(p => p._id) } },
      { status: 0 }
    );

    res.json({
      updatedCategory,
      message: "Category and its products and variants status updated successfully."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getCategory = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCategory = await Category.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategory = asyncHandle(async (req, res) => {
  try {
    const getAllCategory = await Category.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
};
