import express from "express";
import dotenv from "dotenv";

import register from "./api/auth/register.js";
import login from "./api/auth/login.js";
import profile from "./api/auth/profile.js";
import logout from "./api/auth/logout.js";

import createPost from "./api/posts/createPost.js";
import getPost from "./api/posts/getPost.js";
import blogId from "./api/posts/blogId.js";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["https://pixel-stack.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", register);
app.use("/api/auth", login);
app.use("/api/auth", profile);
app.use("/api/auth", logout);

app.use("/api/posts", createPost);
app.use("/api/posts", getPost);
app.use("/api/posts", blogId);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

app.get("*", (req, res) => {
  res.status(200).json({
    message: "hello world",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
