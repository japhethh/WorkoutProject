import express from 'express';
import multer from 'multer';
import {  loginUser, registerUser,changeAccount,changePassword } from '../controllers/userController.js';
import cloudinary from "../utils/cloudinary.js"; // Adjust path as per your project structure
import Auth from '../middleware/Auth.js';
const userRouter = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

userRouter.post("/changePassword",Auth,changePassword);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/profile",upload.single("image"),Auth,changeAccount);


export default userRouter;
