import {
  newAnnouncement,
  getAllAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";
import express from "express";

const announcementRouter = express.Router();

// announcementRouter.get("/getAllAnnouncement", newAnnouncement);
announcementRouter.post("/addAnnouncement", newAnnouncement);
announcementRouter.get("/getAllAnnouncement", getAllAnnouncement);
announcementRouter.get("/deleteAnnouncement", deleteAnnouncement);

export default announcementRouter;
