const GPU = require("../../models/product/gpuModel");
const asyncHandle = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createGPU = asyncHandle(async (req, res) => {
  try {
    const newGPU = await GPU.create(req.body);
    res.json(newGPU);
  } catch (error) {
    throw new Error(error);
  }
});

const updateGPU = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateGPU = await GPU.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateGPU);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteGPU = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteGPU = await GPU.findByIdAndDelete(id);
    res.json(deleteGPU);
  } catch (error) {
    throw new Error(error);
  }
});

const getGPU = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getGPU = await GPU.findById(id);
    res.json(getGPU);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllGPU = asyncHandle(async (req, res) => {
  try {
    const getAllGPU = await GPU.find();
    res.json(getAllGPU);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createGPU,
  updateGPU,
  deleteGPU,
  getGPU,
  getAllGPU,
};
