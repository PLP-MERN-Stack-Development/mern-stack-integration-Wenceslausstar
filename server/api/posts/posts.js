import express from "express";
import multer from "multer";
import fs from "fs";
import jwt from "jsonwebtoken";
import Blog from "../../models/Blog.js";
import {
  validatePost,
  validateId,
  validate,
} from "../../middleware/validate.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Get all posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Blog.find().populate("author");
    res.status(200).json({
      status: 200,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
});

// Get post by ID
router.get("/:id", validateId, validate, async (req, res, next) => {
  try {
    const post = await Blog.findById(req.params.id).populate("author");
    if (!post) {
      return res.status(404).json({
        status: 404,
        message: "Post not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// Create new post
router.post(
  "/",
  upload.single("file"),
  validatePost,
  validate,
  async (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "User not authorized",
        });
      }

      const { file } = req;
      if (!file) {
        return res.status(400).json({
          status: 400,
          message: "Cover image is required",
        });
      }

      const { originalname, path } = file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { title, summary, content } = req.body;

      const post = await Blog.create({
        title,
        summary,
        content,
        cover: newPath,
        author: decoded.id,
      });

      res.status(201).json({
        status: 201,
        message: "Post created successfully",
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update post
router.put(
  "/:id",
  validateId,
  validatePost,
  validate,
  async (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "User not authorized",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const post = await Blog.findById(req.params.id);

      if (!post) {
        return res.status(404).json({
          status: 404,
          message: "Post not found",
        });
      }

      if (post.author.toString() !== decoded.id) {
        return res.status(403).json({
          status: 403,
          message: "Not authorized to update this post",
        });
      }

      const { title, summary, content } = req.body;
      const updatedPost = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, summary, content },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        status: 200,
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete post
router.delete("/:id", validateId, validate, async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "User not authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const post = await Blog.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 404,
        message: "Post not found",
      });
    }

    if (post.author.toString() !== decoded.id) {
      return res.status(403).json({
        status: 403,
        message: "Not authorized to delete this post",
      });
    }

    // Delete the cover image file if it exists
    if (post.cover) {
      try {
        fs.unlinkSync(post.cover);
      } catch (error) {
        console.error("Error deleting cover image:", error);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
