const CPU = require("../../models/product/processorModel");
const asyncHandle = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createCPU = asyncHandle(async (req, res) => {
  try {
    const newCPU = await CPU.create(req.body);
    res.json(newCPU);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCPU = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCPU = await CPU.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCPU);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCPU =
asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCPU = await CPU.findById(id);
    if (!deleteCPU) {
      return res.status(404).json({ message: "CPU not found" });
    }
    deleteCPU.status = deleteCPU.status === 1 ? 0 : 1;
    const updateCPU = await deleteCPU.save();
    res.json(updateCPU);
  } catch (error) {
    throw new Error(error);
  }
});

const getCPU = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCPU = await CPU.findById(id);
    res.json(getCPU);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCPU = asyncHandle(async (req, res) => {
  try {
    const getAllCPU = await CPU.find();
    res.json(getAllCPU);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCPU,
  updateCPU,
  deleteCPU,
  getCPU,
  getAllCPU,
};
