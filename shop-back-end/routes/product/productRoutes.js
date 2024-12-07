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
  deleteCommentDetail,
  getTopSellingProducts,
  getProductsBySales,
  getProductsByViews,
  getTopSellingProductsUsers,
  getReviewsUser,
  getLatestProducts,
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
router.get("/getReviewsUser/:id", getReviewsUser);
router.get("/get-all-comments", getAllProductComments);
//! Update product
router.put("/updateProduct/:id", authMiddleware, isAdmin, updateProduct);
//! Delete product
router.post("/deleteProduct/:id", authMiddleware, isAdmin, deleteProduct);
router.post("/deleteComment/:id", authMiddleware, isAdmin, deleteComment);
router.post(
  "/deleteCommentDetail/:id",
  authMiddleware,
  isAdmin,
  deleteCommentDetail
);
// Các route cho biến thể
router.get("/variants", getAllVariants); // Route lấy tất cả biến thể
router.get("/variant/:variantId", getVariant); // Route lấy một biến thể cụ thể
router.put("/variant/:variantId", updateProductVariant);
router.post("/variant/:variantId", deleteProductVariant);

// Lấy top 5 sản phẩm bán chạy
router.get("/top-selling", getTopSellingProducts);
//top 5 sanr phẩm user
router.get("/top-selling-user", getTopSellingProductsUsers);

// Lấy danh sách sản phẩm theo lượt bán giảm dần
router.get("/products-by-sales", getProductsBySales);
//sản phẩm mới nhất
router.get("/getLatestProducts", getLatestProducts);

// Lấy danh sách sản phẩm theo lượt xem giảm dần
router.get("/products-by-views", getProductsByViews);

module.exports = router;
