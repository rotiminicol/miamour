import express from "express";

const router = express.Router();

// Define your message routes here
router.get("/", (req, res) => {
  res.send("Message route");
});

export default router;
