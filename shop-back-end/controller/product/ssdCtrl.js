const SSD = require("../../models/product/storageModel");
const asyncHandle = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createSSD = asyncHandle(async (req, res) => {
  try {
    const newSSD = await SSD.create(req.body);
    res.json(newSSD);
  } catch (error) {
    throw new Error(error);
  }
});

const updateSSD = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateSSD = await SSD.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateSSD);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSSD = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteSSD = await SSD.findByIdAndDelete(id);
    res.json(deleteSSD);
  } catch (error) {
    throw new Error(error);
  }
});

const getSSD = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getSSD = await SSD.findById(id);
    res.json(getSSD);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllSSD = asyncHandle(async (req, res) => {
  try {
    const getAllSSD = await SSD.find();
    res.json(getAllSSD);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createSSD,
  updateSSD,
  deleteSSD,
  getSSD,
  getAllSSD,
};
