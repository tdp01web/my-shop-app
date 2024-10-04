const express = require("express");
const {
  createLCD,
  updateLCD,
  deleteLCD,
  getLCD,
  getAllLCD,
} = require("../../controller/product/lcdCtrl");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createLCD", authMiddleware, isAdmin, createLCD);
router.put("/updateLCD/:id", authMiddleware, isAdmin, updateLCD);
router.delete("/deleteLCD/:id", authMiddleware, isAdmin, deleteLCD);
router.get("/getLCD/:id", getLCD);
router.get("/getAllLCD", getAllLCD);

module.exports = router;
