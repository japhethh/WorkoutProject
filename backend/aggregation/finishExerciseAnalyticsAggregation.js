import finishExerciseBundleModel from "../models/finishExerciseBundleModel.js";
import mongoose from "mongoose";

const getMonthlyAnalytics = async (req, res) => {
  try {
    const { userId } = req.body;
    const months = [
      { month: 1, name: "January" },
      { month: 2, name: "February" },
      { month: 3, name: "March" },
      { month: 4, name: "April" },
      { month: 5, name: "May" },
      { month: 6, name: "June" },
      { month: 7, name: "July" },
      { month: 8, name: "August" },
      { month: 9, name: "September" },
      { month: 10, name: "October" },
      { month: 11, name: "November" },
      { month: 12, name: "December" },
    ];

    const montlyData = await finishExerciseBundleModel.aggregate([
      {
        $unwind: "$exercises",
      },
      {
        $match: {
          "exercises.isCompleted": true,
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          exerciseDatas: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          year: "$_id.year",
          exerciseDatas: 1,
        },
      },
    ]);

    const dataWithAllMonths = months.map((m) => {
      const monthData = montlyData.find((d) => d.month === m.month);

      return {
        month: m.name,
        year: monthData?.year || new Date().getFullYear(),
        exerciseDatas: monthData?.exerciseDatas || 0,
      };
    });

    res.status(200).json(dataWithAllMonths);
  } catch (error) {
    console.error("Error fetching monthly data history ", error);
    return [];
  }
};

export { getMonthlyAnalytics };
