const express = require("express");
const {
  createGPU,
  updateGPU,
  deleteGPU,
  getGPU,
  getAllGPU,
} = require("../../controller/product/gpuCtrl");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createGPU", authMiddleware, isAdmin, createGPU);
router.put("/updateGPU/:id", authMiddleware, isAdmin, updateGPU);
router.delete("/deleteGPU/:id", authMiddleware, isAdmin, deleteGPU);
router.get("/getGPU/:id", getGPU);
router.get("/getAllGPU", getAllGPU);

module.exports = router;
