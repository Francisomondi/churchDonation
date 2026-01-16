import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function DonateModal({ onClose }) {
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
      const res = await axios.post("http://localhost:5000/api/donation/stkpush", form);
      toast.success("📲 STK Push sent! Check your phone.");
      console.log(res.data); // optional: view donation + MPESA response
      onClose();
    } catch (err) {
      toast.error("❌ Failed to initiate payment");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
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
  );
}
