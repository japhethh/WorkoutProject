import express from "express";
import {
  createExercise,
  getAllExercise,
} from "../controllers/exerciseController.js";

const exerciseRouter = express.Router();

exerciseRouter.get("/", getAllExercise);
exerciseRouter.post("/", createExercise);

export default exerciseRouter;
