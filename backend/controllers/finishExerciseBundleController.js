import expressAsyncHandler from "express-async-handler";
import finishExerciseBundleModel from "../models/finishExerciseBundleModel.js";
import workoutModel from "../models/workoutModel.js";

const createFinishExerciseBundle = expressAsyncHandler(async (req, res) => {
  const { bundleName, exercises } = req.body;
  const { userId } = req.body;

  const exist = await workoutModel.findById(userId);
  if (!exist) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }

  // Empty
  const finishExerciseBundle = new finishExerciseBundleModel({
    userId: userId,
    bundleName: bundleName,
    exercises: exercises,
  });

  if (!finishExerciseBundle) {
    return res
      .status(404)
      .json({ success: false, message: "Finish Exercise Bundle not found!" });
  }

  await finishExerciseBundle.save();

  res.status(201).json({
    success: true,
    message: "Finish Successfully!",
    data: finishExerciseBundle,
  });
});

const getAllFinishExerciseBundle = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  const exist = await workoutModel.findById(userId);

  if (!exist) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }

  const getAll = await finishExerciseBundleModel.find({});
  if (!getAll) {
    return res
      .status(404)
      .json({ success: false, message: "Exercise Bundle not found!" });
  }

  res.status(200).json(getAll);
});

export { createFinishExerciseBundle, getAllFinishExerciseBundle };
