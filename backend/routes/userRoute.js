import express from 'express'
import { loginUser, registerUser,changeAccount } from '../controllers/userController.js';
import multer from 'multer';


const userRouter = express.Router();


const storage = multer.diskStorage({
  destination:"./uploads",
  filename:(req,file,cb)  => { 
    return cb(null,`${Date.now()}${file.originalname}`);
  }
});

const upload = multer({storage:storage});

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/password_and_security",upload.single("image"),changeAccount);


export default userRouter;