const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImage,
  deleteImage,
} = require("../controller/productCtrl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlewares");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");

//! Create a new product
router.post("/create", authMiddleware, isAdmin, createProduct);
//! Get a product
router.get("/getaProduct/:id", getaProduct);
//! Get all products
router.get("/getAllProduct", getAllProduct);
//!
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
//! Update product
router.put("/updateProduct/:id", authMiddleware, isAdmin, updateProduct);
//! Delete product
router.delete("/deleteProduct/:id", authMiddleware, isAdmin, deleteProduct);
//! xóa ảnh
router.delete("/deleteImage/:id", authMiddleware, isAdmin, deleteImage);

//!
router.put(
  "/upload/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImage
);

module.exports = router;
