import express from "express";
import multer from "multer";
import {
  loginUser,
  registerUser,
  changeAccount,
  changePassword,
  allUsers,
} from "../controllers/userController.js";
import cloudinary from "../utils/cloudinary.js"; // Adjust path as per your project structure
import Auth, { authMiddlewareBearer } from "../middleware/Auth.js";
import { totalUser } from "../aggregation/usersAggregation.js";
const userRouter = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/profile", upload.single("image"), Auth, changeAccount);
userRouter.post("/changePassword", Auth, changePassword);
userRouter.get("/getData", authMiddlewareBearer, allUsers);
userRouter.get("/totalUsers", authMiddlewareBearer, totalUser);
export default userRouter;
