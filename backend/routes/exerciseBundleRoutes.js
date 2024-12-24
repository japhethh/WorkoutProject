import express from "express";
import {
  createExerciseBundle,
  getAllExerciseBundle,
} from "../controllers/exerciseBudleController.js";
import { authMiddlewareBearer } from "../middleware/Auth.js";

const exerciseBundleRouter = express.Router();

exerciseBundleRouter.get("/", authMiddlewareBearer, getAllExerciseBundle);
exerciseBundleRouter.post("/", authMiddlewareBearer, createExerciseBundle);

export default exerciseBundleRouter;
