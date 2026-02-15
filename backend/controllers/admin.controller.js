import Donation from "../models/Donation.js";

export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));

    // Totals
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const monthlyDonations = await Donation.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const todayDonations = await Donation.aggregate([
      { $match: { createdAt: { $gte: startOfDay } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalDonors = await Donation.distinct("phone");

    // Donation Type Breakdown
    const typeBreakdown = await Donation.aggregate([
      { $group: { _id: "$type", total: { $sum: "$amount" } } }
    ]);

    // Monthly Chart Data
    const monthlyChart = await Donation.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      total: totalDonations[0]?.total || 0,
      monthly: monthlyDonations[0]?.total || 0,
      today: todayDonations[0]?.total || 0,
      donors: totalDonors.length,
      typeBreakdown,
      monthlyChart
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
