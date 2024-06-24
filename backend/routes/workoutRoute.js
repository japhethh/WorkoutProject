import express from "express";
import { addWorkout,getWorkout,updateWorkout } from "../controllers/workoutController.js";
const workoutRouter = express.Router();

workoutRouter.post("/add", addWorkout);
workoutRouter.get("/get",getWorkout);
workoutRouter.put("/update/:id/exercise/:exerciseId",updateWorkout);
export default workoutRouter;
