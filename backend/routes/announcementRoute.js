import { newAnnouncement,getAllAnnouncement } from "../controllers/announcementController.js";
import express from "express";

const announcementRouter = express.Router();

// announcementRouter.get("/getAllAnnouncement", newAnnouncement);
announcementRouter.post("/addAnnouncement", newAnnouncement);
announcementRouter.get("/getAllAnnouncement", getAllAnnouncement);

export default announcementRouter;
