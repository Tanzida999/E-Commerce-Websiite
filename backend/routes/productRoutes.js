import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//Controller
import { addProduct } from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);

export default router;
