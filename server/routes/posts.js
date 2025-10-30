// routes/posts.js - Routes for post operations

const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
} = require("../controllers/postController");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { body } = require("express-validator");

const router = express.Router();

// Validation rules
const postValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content is required"),
  body("excerpt")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Excerpt cannot be more than 200 characters"),
  body("category").isMongoId().withMessage("Valid category ID is required"),
];

const commentValidation = [
  body("content")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Comment must be between 1 and 500 characters"),
];

// Public routes
router.get("/", getPosts);
router.get("/:id", getPost);

// Protected routes
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("featuredImage"),
  postValidation,
  createPost
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("featuredImage"),
  postValidation,
  updatePost
);
router.delete("/:id", protect, authorize("admin"), deletePost);

// Comments
router.post("/:id/comments", protect, commentValidation, addComment);

module.exports = router;
