import express from "express";
import {
  createFinishExerciseBundle,
  getAllFinishExerciseBundle,
} from "../controllers/finishExerciseBundleController.js";
import { authMiddlewareBearer } from "../middleware/Auth.js";

const finishExerciseBundleRouter = express.Router();

finishExerciseBundleRouter.get(
  "/",
  authMiddlewareBearer,
  getAllFinishExerciseBundle
);
finishExerciseBundleRouter.post(
  "/",
  authMiddlewareBearer,
  createFinishExerciseBundle
);
// finishExerciseBundleRouter.get("/", getAllFinishExerciseBundle);

export default finishExerciseBundleRouter;
