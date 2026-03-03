import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    donorPhone: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    donationType: {
      type: String,
      required: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },
    mpesaReceipt: {
      type: String,
      required: true,
      unique: true,
    },
    checkoutRequestID: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "M-Pesa",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);