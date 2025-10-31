import express from "express";
import dotenv from "dotenv";
import Blog from "../../models/Blog.js";
import jwt from "jsonwebtoken";

const router = express.Router();
dotenv.config();

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Blog.findById(id).populate('author');
        res.status(200).json({
            status: 200,
            message: "Post fetched successfully",
            data: post
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});

export default router;