// routes/categories.js - Routes for category operations

const express = require("express");
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/auth");
const { body } = require("express-validator");

const router = express.Router();

// Validation rules
const categoryValidation = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Category name must be between 1 and 50 characters"),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Description cannot be more than 200 characters"),
  body("color")
    .optional()
    .isHexColor()
    .withMessage("Color must be a valid hex color"),
];

// Public routes
router.get("/", getCategories);

// Protected routes
router.post(
  "/",
  protect,
  authorize("admin"),
  categoryValidation,
  createCategory
);

module.exports = router;
