import express from 'express'
import { loginUser, registerUser,changeAccount } from '../controllers/userController.js';
import multer from 'multer';
import Auth from "../middleware/Auth.js"

const userRouter = express.Router();

//Image Storage engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
  
const upload = multer({ storage: storage });

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/profile",upload.single("image"),Auth,changeAccount);

export default userRouter;