import express from "express";

const router = express.Router();

router.post("/logout", async (req, res) => {
    const token = await req.cookies.token;
    try {
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "User needs to be logged in first!"
            });
        }
        res.cookie('token','').status(200).json({
            status: 200,
            message: "User Logout Success!"
        });
    } catch (error) {
        res.status(400).json({
            message: "Logout Failed",
            error: error.message
        }).end();
    }
});

export default router;