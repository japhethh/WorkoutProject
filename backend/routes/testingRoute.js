import express from 'express';
import multer from 'multer';
import cloudinary from "../utils/cloudinary.js"; // Adjust path as per your project structure

const userRouter = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Route to handle profile image upload using Cloudinary
userRouter.post("/profile", upload.single("imagef"), async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Upload file to Cloudinary with specific folder
    cloudinary.uploader.upload(req.file.path, {
      folder: 'profile_images' // Specify the folder name in your Cloudinary account
    }, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error uploading to Cloudinary",
          error: err.message
        });
      }

      // Optionally, delete the local file after uploading to Cloudinary
      // fs.unlinkSync(req.file.path);

      // Respond with success message and Cloudinary data
      res.status(200).json({
        success: true,
        message: "Image uploaded to Cloudinary",
        data: result
      });
    });
  } catch (error) {
    console.error("Image Upload Error:", error);
    res.status(500).json({ success: false, message: "Image upload failed", error: error.message });
  }
});

export default userRouter;
