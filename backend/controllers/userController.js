import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import { decrypt } from "dotenv";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    console.log("Missing fields in request body", req.body); // Log the body to check what's coming

    throw new Error("Please Fill all the inputs");
  }
  const userExits = await User.findOne({ email });
  if (userExits) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Creating New user
  const newUser = new User({ userName, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide both email and password");
  }

  // Find the user by email
  const existingUser = await User.findOne({ email });

  // If the user doesn't exist
  if (!existingUser) {
    res.status(404);
    throw new Error("User not found");
  }

  // Compare the password provided with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (isPasswordValid) {
    // Create and send the token
    createToken(res, existingUser._id);

    // Respond with user information
    res.status(200).json({
      _id: existingUser._id,
      userName: existingUser.userName,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    });
  } else {
    // Unauthorized error for invalid password
    res.status(401);
    throw new Error("Invalid password");
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.json(users);
});
const getcurrentUserUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.password = hashedPassword;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      userName: updateUser.userName,
      email: updateUser.email,
      idAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not fouuund");
  }
});
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(404);
      throw new Error("Cannot delete Admin User");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User successfully Removed" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found Bro");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      userName: updatedUser.userName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found Bro");
  }
});
export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getcurrentUserUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
