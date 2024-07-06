import express from "express";

import { allUser } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/getAllUser", allUser);

export default adminRouter;
