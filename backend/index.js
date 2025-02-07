import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

//utils
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5001;

connectDB();

const app = express();
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.listen(port, () => console.log(`Server running on port : ${port}`));
