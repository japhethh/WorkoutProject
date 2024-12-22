import exerciseModel from "../models/exerciseModel.js";
import expressAsyncHandler from "express-async-handler";

const createExercise = expressAsyncHandler(async (req, res) => {
  const { name, equipment, description, targetMuscleGroup } = req.body;

  const newExercise = new exerciseModel({
    name,
    equipment,
    description,
    targetMuscleGroup,
  });

  if (!newExercise) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }

  await newExercise.save();

  res.status(201).json({ success: true, message: "Created Successfully!" });
});

const getAllExercise = expressAsyncHandler(async (req, res) => {
  const getAll = await exerciseModel.find({});
  if (!getAll) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }

  res.status(200).json(getAll);
});

export { createExercise, getAllExercise };
