const RAM = require("../../models/product/ramModel");
const asyncHandle = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createRAM = asyncHandle(async (req, res) => {
  try {
    const newRAM = await RAM.create(req.body);
    res.json(newRAM);
  } catch (error) {
    throw new Error(error);
  }
});

const updateRAM = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateRAM = await RAM.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateRAM);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteRAM = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteRAM = await RAM.findById(id);
    if (!deleteRAM) {
      return res.status(404).json({ message: "RAM not found" });
    }
    deleteRAM.status = deleteRAM.status === 1 ? 0 : 1;
    const updateRAM = await deleteRAM.save();
    res.json(updateRAM);
  } catch (error) {
    throw new Error(error);
  }
});

const getRAM = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getRAM = await RAM.findById(id);
    res.json(getRAM);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllRAM = asyncHandle(async (req, res) => {
  try {
    const getAllRAM = await RAM.find();
    res.json(getAllRAM);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createRAM,
  updateRAM,
  deleteRAM,
  getRAM,
  getAllRAM,
};
