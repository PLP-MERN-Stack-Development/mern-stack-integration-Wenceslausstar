import express from "express";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign({ 
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({
            status: 200,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: "Login failed",
            error: error.message
        }).end();
    }
});

export default router;