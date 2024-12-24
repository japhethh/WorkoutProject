import expressAsyncHandler from "express-async-handler";
import exerciseBundleModel from "./exerciseBundleModel.js";
// Aggregation
const totalPrices = expressAsyncHandler(async (req, res) => {
  const getTheTotalPrice = await exerciseBundleModel.aggregate([
    {
      $group: {
        _id: "$bundleName",
        totalAmount: { $sum: 1 },
      },
    },
  ]);

  res.json(getTheTotalPrice);
});

export { totalPrices };
