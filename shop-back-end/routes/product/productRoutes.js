const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rateProduct,
} = require("../../controller/product/productCtrl");
const router = express.Router();
const {
  isAdmin,
  authMiddleware,
} = require("../../middlewares/authMiddlewares");
const {
  uploadPhoto,
  productImgResize,
} = require("../../middlewares/uploadImages");

//! Create a new product
router.post("/create", authMiddleware, isAdmin, createProduct);
//! Get a product
router.get("/getaProduct/:id", getaProduct);
//! Get all products
router.get("/getAllProduct", getAllProducts);
//!
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rateProduct);
//! Update product
router.put("/updateProduct/:id", authMiddleware, isAdmin, updateProduct);
//! Delete product
router.delete("/deleteProduct/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
