import mongoose from "mongoose";

const AnnouncementShema = new mongoose.Schema({
  head:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true,
  },
  footer:{
    type:String
  }
  
},{timestamps:true});

const announcementModel = mongoose.model("Announcement",AnnouncementShema);

export default announcementModel;

