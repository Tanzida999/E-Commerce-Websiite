import express from "express";
import { createUser } from "../controllers/userController.js";
const router = express.Router();
import { loginUser } from "../controllers/userController.js";
import { logoutCurrentUser } from "../controllers/userController.js";

router.route("/").post(createUser);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

export default router;
