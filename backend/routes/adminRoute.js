import express from "express";

import { allUser, deleteUser } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/getAllUser", allUser);
adminRouter.post("/deleteUser", deleteUser);

export default adminRouter;
