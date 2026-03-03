import express from "express";
import {
  checkDonationStatus,
  donate,
  donationCallback,
  getDonationHistory,
} from "../controllers/donation.Controller.js";

const router = express.Router();

router.post("/stkpush", donate);
router.post("/callback", donationCallback);
router.get("/status/:checkoutID",checkDonationStatus);
router.get("/history/:phone", getDonationHistory);

export default router;
