const LCD = require("../../models/product/lcdModel");
const asyncHandle = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const createLCD = asyncHandle(async (req, res) => {
  try {
    const newLCD = await LCD.create(req.body);
    res.json(newLCD);
  } catch (error) {
    throw new Error(error);
  }
});

const updateLCD = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateLCD = await LCD.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateLCD);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteLCD = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteLCD = await LCD.findByIdAndDelete(id);
    res.json(deleteLCD);
  } catch (error) {
    throw new Error(error);
  }
});

const getLCD = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getLCD = await LCD.findById(id);
    res.json(getLCD);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllLCD = asyncHandle(async (req, res) => {
  try {
    const getAllLCD = await LCD.find();
    res.json(getAllLCD);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createLCD,
  updateLCD,
  deleteLCD,
  getLCD,
  getAllLCD,
};
