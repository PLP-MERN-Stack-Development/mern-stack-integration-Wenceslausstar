import express from "express";
import multer from "multer";
import fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Blog from "../../models/Blog.js";

const router = express.Router();
dotenv.config();

const upload = multer({ dest: "uploads/" });

router.post("/createPost", upload.single('file'), async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);

        const { token } = await req.cookies;
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
            if (err) throw err;
            const { title, summary, content } = req.body;
            const postDoc = await Blog.create({
                title,
                summary,
                content,
                cover: newPath,
                author: decoded.id,
            });
            res.status(200).json({
                status: 200,
                message: "Post created successfully",
                data: postDoc
            });
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});

export default router;