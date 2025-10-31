import express from "express";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/profile", async (req, res) => {
    const token = await req.cookies.token;
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Profile not found"
            });
        }
        res.status(200).json({
            status: 200,
            message: "Profile found",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Profile not found",
            error: error.message
        }).end();
    }
});

export default router;