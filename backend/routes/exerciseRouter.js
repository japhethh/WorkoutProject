import express from "express";
import {
  createExercise,
  getAllExercise,
} from "../controllers/exerciseController.js";
import multer from "multer";
const exerciseRouter = express.Router();

const storage = multer.diskStorage({
  destination: "/.uploads",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

exerciseRouter.get("/", getAllExercise);
exerciseRouter.post("/", upload.single("image"), createExercise);

export default exerciseRouter;
