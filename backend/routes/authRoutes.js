import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check", authorize, (req, res) => {
    res.json({ success: true, message: "User is authenticated", user: req.user });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authorize, logoutUser);

export default router;
