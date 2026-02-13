import express from "express";
import {
  donate,
  donationCallback,
  getDonationHistory,
} from "../controllers/donation.Controller.js";

const router = express.Router();

router.post("/stkpush", donate);
router.post("/callback", donationCallback);
router.get("/history/:phone", getDonationHistory);

export default router;
