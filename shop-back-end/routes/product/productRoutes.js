const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rateProduct,
  getAllVariants,
  getVariant,
  updateProductVariant,
  deleteProductVariant,
  getRelatedProducts,
  searchProducts,
  getAllProductsForUsers,
  getProductComments,
  getAllProductComments,
  deleteComment,
  deleteCommentDetail
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
router.post("/create", createProduct);
//! Get a product
router.get("/getaProduct/:id", getaProduct);
//! Get all products
router.get("/getAllProduct", getAllProducts);
router.get("/get-all-product-user", getAllProductsForUsers);

//tim kiem san pham
router.get("/search", searchProducts);

//! Lấy sản phẩm cùng loại
router.get("/getRelatedProducts/:categoryId/:excludeId", getRelatedProducts);

//!
router.put("/wishlist", authMiddleware, addToWishlist);
router.post("/rate", authMiddleware, rateProduct);
router.get("/getReviews/:id", getProductComments);
router.get("/get-all-comments", getAllProductComments);
//! Update product
router.put("/updateProduct/:id", authMiddleware, isAdmin, updateProduct);
//! Delete product
router.post("/deleteProduct/:id", authMiddleware, isAdmin, deleteProduct);
router.post("/deleteComment/:id", authMiddleware, isAdmin, deleteComment);
router.post("/deleteCommentDetail/:id", authMiddleware, isAdmin, deleteCommentDetail);
// Các route cho biến thể
router.get("/variants", getAllVariants); // Route lấy tất cả biến thể
router.get("/variant/:variantId", getVariant); // Route lấy một biến thể cụ thể
router.put("/variant/:variantId", updateProductVariant);
router.post("/variant/:variantId", deleteProductVariant);

module.exports = router;
