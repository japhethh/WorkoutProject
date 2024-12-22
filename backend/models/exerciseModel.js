import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  equipment: { type: String, required: true },
  targetMuscleGroup: { type: String },
  description: { type: String },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
});

const exerciseModel = mongoose.model("Exercise", exerciseSchema);

export default exerciseModel;
