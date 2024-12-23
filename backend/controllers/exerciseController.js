import exerciseModel from "../models/exerciseModel.js";
import expressAsyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

const createExercise = expressAsyncHandler(async (req, res) => {
  const { name, equipment, description, targetMuscleGroup } = req.body;
  const createData = req.body;
  const createField = { ...createData };

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "exercise_list_images",
      });

      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }

      createField.image = result.secure_url;
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Image upload failed", error });
    }
  }

  const newExercise = new exerciseModel({
    name,
    equipment,
    description,
    targetMuscleGroup,
    image: createField.image,
  });

  if (!newExercise) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }

  await newExercise.save();

  res
    .status(201)
    .json({ success: true, message: "Created Successfully!", newExercise });
});

const getAllExercise = expressAsyncHandler(async (req, res) => {
  const getAll = await exerciseModel.find({});
  if (!getAll) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }

  res.status(200).json(getAll);
});

export { createExercise, getAllExercise };
