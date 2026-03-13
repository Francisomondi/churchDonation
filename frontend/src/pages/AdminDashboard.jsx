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
import StatusBadge from "../components/StatusBadge";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axiosInstance.get("/admin/dashboard");
        setStats(statsRes.data);

        const ordersRes = await axiosInstance.get("/orders");
        setOrders(ordersRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-emerald-600">
            DONATION ADMIN
          </h2>
        </div>

        <nav className="p-4 space-y-2">
          <SidebarItem
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarItem
            label="Orders"
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
          />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {activeTab === "dashboard" ? "Dashboard Overview" : "All Orders"}
        </h1>

        {activeTab === "dashboard" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard title="Total Donations" value={stats.total} />
              <StatCard title="This Month" value={stats.monthly} />
              <StatCard title="Today" value={stats.today} />
              <StatCard title="Unique Donors" value={stats.donors} />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg text-emerald-600 font-semibold mb-4" >
                Monthly Donations
              </h2>

              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.monthlyChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) =>
                        `KES ${Number(value).toLocaleString()}`
                      }
                    />
                    <Bar dataKey="total" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-emerald-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Receipt</th>
                    <th className="p-3 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50 transition text-gray-500"
                    >
                      <td className="p-3">{order.donorPhone}</td>
                      <td className="p-3 font-semibold">
                        KES {order.amount.toLocaleString()}
                      </td>
                      <td className="p-3">{order.donationType}</td>
                       <td className="p-3"><StatusBadge status={order.status} /></td>
                      <td className="p-3">{order.mpesaReceipt}</td>
                      <td className="p-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {orders.length === 0 && (
                <p className="text-center py-6 text-gray-500">
                  No orders yet
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ----------------------------- */
/* Components                    */
/* ----------------------------- */

function SidebarItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg transition ${
        active
          ? "bg-emerald-100 text-emerald-600 font-semibold"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-800">
        KES {Number(value || 0).toLocaleString()}
      </p>
    </div>
  );
}