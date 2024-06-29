import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js';

import authMiddleware from '../middleware/Auth.js';

const userRouter = express.Router();
// import multer from 'multer';


// const storage = multer.diskStorage({
//   destination:"./uploads",
//   filename:(req,file,cb)  => {
//     return cb(null,`${Date.now()}${file.originalname}`);
//   }
// });

// const upload = multer({storage:storage});
// ,upload.single("image")
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);


export default userRouter;