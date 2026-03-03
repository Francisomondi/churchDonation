import axios from "axios";
import Donation from "../models/Donation.js";
import { formatPhone } from "../utils/phoneFormatter.js";
import Order from "../models/Order.js";

/* =======================
   ACCESS TOKEN
======================= */
const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  );

  return res.data.access_token;
};

/* =======================
   STK PUSH
======================= */
export const donate = async (req, res) => {
  try {
    const { phone, amount, type } = req.body;

    const formattedPhone = formatPhone(phone);
    const token = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "Church Donation",
        TransactionDesc: type,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    await Donation.create({
      phone: formattedPhone,
      amount,
      type,
      status: "pending",
      checkoutRequestID: stkRes.data.CheckoutRequestID,
    });

    res.json({
      message: "STK Push sent",
      data: stkRes.data,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* =======================
   MPESA CALLBACK
======================= */
export const donationCallback = async (req, res) => {
  try {
    // 1️⃣ Always acknowledge Safaricom immediately
    res.json({ ResultCode: 0, ResultDesc: "Accepted" });

    // 2️⃣ Validate structure safely
    const stkCallback = req.body?.Body?.stkCallback;
    if (!stkCallback) {
      console.error("Invalid callback structure", req.body);
      return;
    }

    const {
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = stkCallback;

    if (!CheckoutRequestID) {
      console.error("Missing CheckoutRequestID");
      return;
    }

    // 3️⃣ Find donation
    const donation = await Donation.findOne({
      checkoutRequestID: CheckoutRequestID,
    });

    if (!donation) {
      console.error("Donation not found:", CheckoutRequestID);
      return;
    }

    // 4️⃣ Prevent duplicate updates (idempotency protection)
    if (donation.status === "success") {
      console.log("Duplicate callback ignored:", CheckoutRequestID);
      return;
    }

    // 5️⃣ If payment successful
    if (ResultCode === 0) {
      const metadataItems = CallbackMetadata?.Item || [];

      const getValue = (name) =>
        metadataItems.find((item) => item.Name === name)?.Value;

      donation.status = "success";
      donation.mpesaReceipt = getValue("MpesaReceiptNumber");
      donation.amount = getValue("Amount") || donation.amount;
      donation.phone = getValue("PhoneNumber") || donation.phone;
      donation.transactionDate = getValue("TransactionDate");
      donation.resultDesc = ResultDesc;

    } else {
      donation.status = "failed";
      donation.resultDesc = ResultDesc;
    }

    // 6️⃣ Store raw callback for audit trail
    donation.rawCallback = req.body;

    await donation.save();

      // 🟢 Create Order (only if not exists)
  const existingOrder = await Order.findOne({
    mpesaReceipt: donation.mpesaReceipt,
  });

  if (!existingOrder) {
    await Order.create({
      donorPhone: donation.phone,
      amount: donation.amount,
      donationType: donation.type,
      campaign: donation.campaign,
      mpesaReceipt: donation.mpesaReceipt,
      checkoutRequestID: donation.checkoutRequestID,
    });
  }

  } catch (error) {
    console.error("M-Pesa callback error:", error.message);
  }
};

export const getDonationHistory = async (req, res) => {
  try {
    const { phone } = req.params;

    const donations = await Donation.find({ phone })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donation history" });
  }
};

export const checkDonationStatus = async (req, res) => {
  
  try {
    const donation = await Donation.findOne({
      checkoutRequestID: req.params.checkoutID,
    }); 
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.json({ status: donation.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};