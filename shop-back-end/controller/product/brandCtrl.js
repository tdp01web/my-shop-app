const Brand = require("../../models/product/brandModel");
const asyncHandle = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createBrand = asyncHandle(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    brand.status = brand.status === 1 ? 0 : 1;
    const updatedBrand = await brand.save();
    res.json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBrand = await Brand.findById(id);
    res.json(getBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBrand = asyncHandle(async (req, res) => {
  try {
    const getAllBrand = await Brand.find();
    res.json(getAllBrand);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
};
