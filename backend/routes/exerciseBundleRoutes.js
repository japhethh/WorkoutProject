import express from "express";
import {
  createExerciseBundle,
  getAllExerciseBundle,
  getExerciseBundleData,
  getAllDataWithoutToken,
} from "../controllers/exerciseBudleController.js";
import authMiddleware, { authMiddlewareBearer } from "../middleware/Auth.js";
authMiddleware;
const exerciseBundleRouter = express.Router();

exerciseBundleRouter.get("/", authMiddlewareBearer, getAllExerciseBundle);
exerciseBundleRouter.get("/without-Token", getAllDataWithoutToken);
exerciseBundleRouter.post("/", authMiddlewareBearer, createExerciseBundle);
exerciseBundleRouter.get("/:id", authMiddlewareBearer, getExerciseBundleData);

export default exerciseBundleRouter;
