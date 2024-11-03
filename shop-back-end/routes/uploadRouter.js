const express = require("express");
const { uploadImage, deleteImage } = require("../controller/uploadCtl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlewares");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");

//! xóa ảnh
router.delete("/deleteImage/:id", authMiddleware, isAdmin, deleteImage);

//!
router.post(
  "/",
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImage
);

module.exports = router;
