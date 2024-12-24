import expressAsyncHandler from "express-async-handler";
import exerciseBundleModel from "../models/exerciseBundleModel.js";
import workoutModel from "../models/workoutModel.js";
const createExerciseBundle = expressAsyncHandler(async (req, res) => {
  const { newProgram, exercises } = req.body;

  // Ensure exercises is an array of IDs
  if (!Array.isArray(exercises) || exercises.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid exercises data" });
  }

  // Transform the exercises array into the structure required by the schema
  const formattedExercises = exercises.map((exerciseId) => ({
    exerciseId,
  }));

  console.log(formattedExercises);

  // Create a new exercise bundle
  const newBundle = new exerciseBundleModel({
    bundleName: newProgram,
    exercises: formattedExercises,
  });

  await newBundle.save();

  res
    .status(201)
    .json({ success: true, message: "Created Successfully!", newBundle });
});

const getAllExerciseBundle = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  const exist = await workoutModel.findById(userId);

  if (!exist) {
    return res
      .status(401)
      .json({ success: false, message: "Exercise Bundle Not found!" });
  }

  const getAll = await exerciseBundleModel.find({});

  res.status(200).json(getAll);
});

export { createExerciseBundle, getAllExerciseBundle };
