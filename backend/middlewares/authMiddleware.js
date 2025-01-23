import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //read jwt from the jwt cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select("-password");
      if (!req.user) {
        res
          .status(404)
          .json({ message: "User not found. Please log in again." });
        return;
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorized token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, token failed1.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not Authorized as an admin");
  }
};

export { authenticate, authorizeAdmin };
