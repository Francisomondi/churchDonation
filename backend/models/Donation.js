import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    phone: String,
    amount: Number,
    type: {
      type: String,
      enum: ["tithe", "offering", "project", "general"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    checkoutRequestID: String,
    mpesaReceipt: String,
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
