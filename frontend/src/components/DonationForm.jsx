import { useState } from "react";
import axios from "axios";

export default function DonationForm() {
  const [form, setForm] = useState({
    phone: "",
    amount: "",
    donationType: "tithe",
    projectName: "",
  });

  const submit = async () => {
    await axios.post("http://localhost:5000/api/mpesa/stk", form);
    alert("Check your phone to complete payment");
  };

  return (
    <div className="bg-white p-6 rounded shadow w-96 space-y-3">
      <h2 className="text-xl font-bold">Church Donation</h2>

      <select
        onChange={(e) => setForm({ ...form, donationType: e.target.value })}
        className="w-full border p-2"
      >
        <option value="tithe">Tithe</option>
        <option value="offering">Offering</option>
        <option value="project">Project</option>
        <option value="general">General</option>
      </select>

      {form.donationType === "project" && (
        <input
          placeholder="Project Name"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, projectName: e.target.value })}
        />
      )}

      <input
        placeholder="2547XXXXXXXX"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        placeholder="Amount"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        Donate via MPESA
      </button>
    </div>
  );
}
