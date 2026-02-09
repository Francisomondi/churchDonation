import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import donationRoutes from "./routes/donation.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import path from "path";


dotenv.config();
connectDB();

const app = express();

// ESM dirname fix

const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// API routes
app.use("/api/donation", donationRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
}


app.use("/api/donation", donationRoutes);


// Error handler (always last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
