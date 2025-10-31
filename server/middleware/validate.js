import { body, param, validationResult } from "express-validator";

export const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("summary").trim().notEmpty().withMessage("Summary is required"),
];

export const validateId = [
  param("id").isMongoId().withMessage("Invalid post ID format"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array(),
    });
  }
  next();
};
