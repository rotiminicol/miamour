import express from "express";
import authRoutes from "./authRoutes.js";
import userMatchRoutes from "./userMatchRoutes.js";
import messageRoutes from "./messageRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user-match", userMatchRoutes); // Renamed to avoid conflict
router.use("/messages", messageRoutes);

export default router;
