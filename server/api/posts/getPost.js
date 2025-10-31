import express from "express";
import dotenv from "dotenv";
import Blog from "../../models/Blog.js";
import jwt from "jsonwebtoken";

const router = express.Router();
dotenv.config();

router.get("/getPost", async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "User not Authorized"
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) throw err;
            const posts = await Blog.find().populate('author');
            res.status(200).json({
                status: 200,
                message: "Posts fetched successfully",
                data: posts
            });
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});

export default router;