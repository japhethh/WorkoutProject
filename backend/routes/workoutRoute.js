import express from "express";
import { addWorkout,getWorkout,updateWorkout,deleteWorkout } from "../controllers/workoutController.js";
import Auth from '../middleware/Auth.js'
const workoutRouter = express.Router();

workoutRouter.post("/add",Auth, addWorkout);
workoutRouter.get("/get",Auth,getWorkout);
workoutRouter.put("/update/:id/exercise/:exerciseId",updateWorkout);
workoutRouter.delete("/delete/exercise/:exerciseId",Auth,deleteWorkout)

workoutRouter.post("/")
export default workoutRouter;
