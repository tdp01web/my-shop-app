const express = require("express");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColor,
} = require("../controller/colorCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createColor", authMiddleware, isAdmin, createColor);
router.put("/updateColor/:id", authMiddleware, isAdmin, updateColor);
router.delete("/deleteColor/:id", authMiddleware, isAdmin, deleteColor);
router.get("/getColor/:id", getColor);
router.get("/getAllColor", getAllColor);

module.exports = router;
