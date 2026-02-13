import axios from "axios";
import Donation from "../models/Donation.js";
import { formatPhone } from "../utils/phoneFormatter.js";

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
    const callback =
      req.body.Body.stkCallback;

    const checkoutID = callback.CheckoutRequestID;
    const resultCode = callback.ResultCode;

    if (resultCode === 0) {
      const metadata = callback.CallbackMetadata.Item;

      const receipt = metadata.find(
        (i) => i.Name === "MpesaReceiptNumber"
      )?.Value;

      await Donation.findOneAndUpdate(
        { checkoutRequestID: checkoutID },
        {
          status: "success",
          mpesaReceipt: receipt,
        }
      );
    } else {
      await Donation.findOneAndUpdate(
        { checkoutRequestID: checkoutID },
        { status: "failed" }
      );
    }

    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
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
