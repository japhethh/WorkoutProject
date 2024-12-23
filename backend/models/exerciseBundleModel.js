import mongoose from "mongoose";

const exerciseBundleSchema = new mongoose.Schema(
  {
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" },
    bundleName: { type: String, required: true },
    exercises: [
      {
        exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
        sets: { type: Number, default: 3 },
        reps: { type: Number, default: 13 },
      },
    ],
  },
  { timestamps: true }
);

const exerciseBundleModel = mongoose.model(
  "ExerciseBundle",
  exerciseBundleSchema
);

export default exerciseBundleModel;
