import expressAsyncHandler from "express-async-handler";
import exerciseBundleModel from "../models/exerciseBundleModel.js";
import workoutModel from "../models/workoutModel.js";

const createExerciseBundle = expressAsyncHandler(async (req, res) => {
  const { newProgram, exercises } = req.body;
  const { userId } = req.body;

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
    userId: userId,
    bundleName: newProgram,
    exercises: formattedExercises,
    custom: true,
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

  const getAll = await exerciseBundleModel.find({ userId });

  res.status(200).json(getAll);
});

const getAllDataWithoutToken = expressAsyncHandler(async (req, res) => {
  const getAll = await exerciseBundleModel.find({});

  if (!getAll) {
    return res
      .status(404)
      .json({ success: false, message: "Exercise Bundle not found!" });
  }

  res.status(200).json({ success: false, data: getAll });
});

const getExerciseBundleData = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  const exist = await workoutModel.findById(userId);
  if (!exist) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }

  const getData = await exerciseBundleModel.findById(id).populate([
    {
      path: "userId",
      select: "userName email",
    },
    {
      path: "exercises.exerciseId",
      select: "name equipment targetMuscleGroup _id image",
    },
  ]);

  if (!getData) {
    return res
      .status(404)
      .json({ success: false, message: "Exercise id not found!" });
  }

  res.status(200).json(getData);
});

export {
  createExerciseBundle,
  getAllExerciseBundle,
  getAllDataWithoutToken,
  getExerciseBundleData,
};
