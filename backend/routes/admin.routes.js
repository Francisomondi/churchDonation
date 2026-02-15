
import express from "express";
import { getDashboardStats } from "../controllers/admin.controller.js";
//import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);

export default router;
