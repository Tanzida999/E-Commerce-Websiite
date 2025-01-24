import express from "express";
import {
  createUser,
  getAllUsers,
  getcurrentUserUserProfile,
  updateCurrentUserProfile,
} from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import { logoutCurrentUser } from "../controllers/userController.js";
import { authorizeAdmin, authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getcurrentUserUserProfile)
  .put(authenticate, updateCurrentUserProfile);
export default router;
