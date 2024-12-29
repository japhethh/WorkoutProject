import mongoose from "mongoose";

const finishExerciseBundleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
      required: true,
    },
    bundleName: { type: String, required: true },
    exercises: [
      {
        exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
        sets: { type: Number, default: 3 },
        reps: { type: Number, default: 13 },
        isCompleted: { type: Boolean, default: false },
      },
    ],
    status: {
      type: String,
      enum: ["completed", "incomplete"],
      default: "incomplete",
    },
  },
  { timestamps: true }
);

const finishExerciseBundleModel = mongoose.model(
  "FinishExerciseBundle",
  finishExerciseBundleSchema
);

export default finishExerciseBundleModel;
