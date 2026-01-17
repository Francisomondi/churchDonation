import express from "express";
import {
  donate,
  donationCallback,
} from "../controllers/donation.Controller.js";

const router = express.Router();

router.post("/stkpush", donate);
router.post("/callback", donationCallback);

export default router;
