import express from "express";
import { addWorkout,getWorkout,updateWorkout,deleteWorkout } from "../controllers/workoutController.js";
const workoutRouter = express.Router();

workoutRouter.post("/add", addWorkout);
workoutRouter.get("/get",getWorkout);
workoutRouter.put("/update/:id/exercise/:exerciseId",updateWorkout);
workoutRouter.delete("/delete/:id/exercise/:exerciseId",deleteWorkout)

workoutRouter.post("/")
export default workoutRouter;
