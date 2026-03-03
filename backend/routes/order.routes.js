import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Get all successful orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("campaign");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;