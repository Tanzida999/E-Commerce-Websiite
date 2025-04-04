import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//Controller
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

// Put static routes BEFORE dynamic ones
router.get("/allproducts/top", fetchTopProducts);
router.get("/allproducts", fetchAllProducts);
router.get("/new", fetchNewProducts);

router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
