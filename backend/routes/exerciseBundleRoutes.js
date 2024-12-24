import express from "express";
import { createExerciseBundle } from "../controllers/exerciseBudleController.js";
import { authMiddlewareBearer } from "../middleware/Auth.js";

const exerciseBundleRouter = express.Router();

// exerciseBundleRouter.get("/", getExerciseBundle);
exerciseBundleRouter.post("/", authMiddlewareBearer, createExerciseBundle);

export default exerciseBundleRouter;
