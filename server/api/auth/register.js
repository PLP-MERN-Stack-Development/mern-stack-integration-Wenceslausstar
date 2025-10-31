import express from "express";
import User from "../../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const checkMail = await User.findOne({ email });
        if (checkMail) {
            return res.status(409).json({ 
                status: 409,
                error: "Email Already Exists!!" 
            });
        }
        const hashPass = await bcrypt.hash(password, 12);
        const userDetails = new User({
            name,
            email,
            password: hashPass
        });
        await userDetails.save();
        res.status(200).json({
            status: 200,
            message: "User registered successfully", 
            user: {
                id: userDetails._id,
                name: userDetails.name,
                email: userDetails.email,
                createdAt: userDetails.createdAt
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Registration failed",
            error: error.message
        });
    }
});

export default router;