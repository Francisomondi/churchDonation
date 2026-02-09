import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";

export default function DonateModal({ onClose, cause }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: "tithe",
    amount: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/donation/stkpush", form);
      toast.success("📲 STK Push sent! Check your phone.");
      console.log(res.data); // optional: view donation + MPESA response
      onClose();
    } catch (err) {
        const msg =
        err.response?.data?.message ||
        "Payment request failed. Please try again.";

        toast.error(msg);
        console.error(err);
      }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-emerald-400 mb-2">
          Donate
        </h2>

        {cause && (
          <p className="text-sm text-gray-300 mb-4">
            Cause: <span className="text-emerald-300">{cause.title}</span>
          </p>
        )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-bold text-center">Church Donation</h2>

            {/* Donation Types */}
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="tithe">Tithe</option>
              <option value="offering">Offering</option>
              <option value="project">Project</option>
              <option value="general">General</option>
            </select>

            {/* Amount */}
            <input
              name="amount"
              type="number"
              placeholder="Amount (KES)"
              value={form.amount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            {/* Phone */}
            <input
              name="phone"
              placeholder="07XXXXXXXX"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
              >
                {loading ? "Sending..." : "Give via M-Pesa"}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}
