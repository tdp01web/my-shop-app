const express = require("express");
const {
  createRAM,
  updateRAM,
  deleteRAM,
  getRAM,
  getAllRAM,
} = require("../../controller/product/ramCtrl");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createRAM", authMiddleware, isAdmin, createRAM);
router.put("/updateRAM/:id", authMiddleware, isAdmin, updateRAM);
router.delete("/deleteRAM/:id", authMiddleware, isAdmin, deleteRAM);
router.get("/getRAM/:id", getRAM);
router.get("/getAllRAM", getAllRAM);

module.exports = router;
