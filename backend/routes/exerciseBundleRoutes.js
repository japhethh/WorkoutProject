import express from "express";
import { createExerciseBundle } from "../controllers/exerciseBudleController.js";
// import authMiddleware from "../middleware/Auth.js";

const exerciseBundleRouter = express.Router();

// exerciseBundleRouter.get("/", getExerciseBundle);
exerciseBundleRouter.post("/", createExerciseBundle);

export default exerciseBundleRouter;
