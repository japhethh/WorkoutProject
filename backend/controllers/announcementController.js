import announcementModel from "../models/announcementModel.js";

// GET THE ALL ANNOUNCEMENT
const getAllAnnouncement = async (req, res) => {
  try {
    const announcement = await announcementModel.find({});
    res.status(200).json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: "error" });
  }
};

// ADD NEW ANNOUNCEMENT
const newAnnouncement = async (req, res) => {
  const { head, body, footer } = req.body;

  try {
    const bago = new announcementModel({
      head: head,
      body: body,
      footer: footer,
    });

    await bago.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully added new announcement" });
  } catch (error) {
    console.error("Error adding new announcement:", error);
    res
      .status(500)
      .json({ success: false, message: "Error adding new announcement" });
  }
};


const deleteAnnouncement = async (req, res) => {
  const { userId } = req.body; // Retrieve userId from request body

  try {
    const announcement = await announcementModel.findByIdAndDelete(userId);
    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    res.status(200).json({ success: true, message: "Delete Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error deleting announcement" });
  }
};


export { newAnnouncement, getAllAnnouncement, deleteAnnouncement };
