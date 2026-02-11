import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";

export default function DonateModal({ onClose, cause }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ NEW
  const [form, setForm] = useState({
    type: "tithe",
    amount: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const normalizePhone = (phone) =>
    phone.startsWith("0") ? `254${phone.slice(1)}` : phone;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        phone: normalizePhone(form.phone),
      };

      await axiosInstance.post("/api/donation/stkpush", payload);

      toast.success("📲 STK Push sent! Check your phone.");
      setSuccess(true); // ✅ show success screen
    } catch (err) {
      const msg =
        err.response?.data?.message || "Payment request failed. Please try again.";
      toast.error(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4 relative">
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-50">
                <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
              </div>
            )}

            <h2 className="text-2xl font-bold text-center text-emerald-600 mb-4">
              Church Donation
            </h2>

            {cause && (
              <p className="text-sm text-gray-500 mb-4 text-center">
                Supporting: <span className="font-medium">{cause.title}</span>
              </p>
            )}

            {/* Donation Type */}
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="tithe">Tithe</option>
              <option value="offering">Offering</option>
              <option value="project">Project</option>
              <option value="general">General</option>
            </select>

            {/* Quick Amount Buttons */}
            <div className="flex gap-2 justify-center">
              {[500, 1000, 2000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setForm({ ...form, amount: amt })}
                  className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-emerald-100 transition"
                >
                  {amt}
                </button>
              ))}
            </div>

            {/* Amount Input */}
            <input
              name="amount"
              type="number"
              placeholder="Amount (KES)"
              value={form.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />

            {/* Phone Input */}
            <input
              name="phone"
              placeholder="07XXXXXXXX"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-md w-full hover:bg-emerald-700 hover:shadow-lg transition-all duration-200"
            >
              {loading ? "Processing..." : "Give via M-Pesa"}
            </button>

            {/* Trust Indicator */}
            <p className="text-xs text-gray-400 text-center mt-2">
              🔒 Secure M-Pesa Payment | Powered by Safaricom
            </p>
          </form>
        ) : (
          // ✅ Success Confirmation Screen
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="text-emerald-600 text-6xl">✅</div>
            <h2 className="text-xl font-bold text-center">STK Push Sent!</h2>
            <p className="text-gray-500 text-center">
              Please complete the payment on your phone to finalize your donation.
            </p>
            <button
              onClick={onClose}
              className="btn-primary px-6 py-2 mt-2"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
