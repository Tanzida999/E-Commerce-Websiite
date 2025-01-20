import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//utils
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5555;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.listen(port, () => console.log(`Server running on port : ${port}`));