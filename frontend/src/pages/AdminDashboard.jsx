import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  //useEffect(() => {
  //  const isAdmin = localStorage.getItem("isAdmin");
  //  if (!isAdmin) window.location.href = "/";
  //}, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/api/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          Failed to load dashboard data
        </p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="animate-pulse text-gray-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Donations" value={stats.total} />
        <StatCard title="This Month" value={stats.monthly} />
        <StatCard title="Today" value={stats.today} />
        <StatCard title="Unique Donors" value={stats.donors} />
      </div>

      {/* Chart Card */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Monthly Donations Overview
        </h2>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats.monthlyChart}
              margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="_id"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `KES ${v / 1000}k`}
              />
              <Tooltip
                formatter={(value) =>
                  `KES ${Number(value).toLocaleString()}`
                }
              />
              <Bar
                dataKey="total"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- */
/* Components                    */
/* ----------------------------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-gray-800">
        KES {Number(value || 0).toLocaleString()}
      </p>
    </div>
  );
}
