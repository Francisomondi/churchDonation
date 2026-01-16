import express from "express";
import {
  donate,
  donationCallback,
} from "../controllers/donation.controller.js";

const router = express.Router();

router.post("/stkpush", donate);
router.post("/callback", donationCallback);

export default router;
