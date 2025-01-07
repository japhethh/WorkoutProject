import mongoose from "mongoose";
import workModel from "../models/workoutModel.js";
import expressAsyncHandler from "express-async-handler";

const totalUser = expressAsyncHandler(async (req, res) => {
  const total = await workModel.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({ total: total[0].count || 0 });
});

export { totalUser };
