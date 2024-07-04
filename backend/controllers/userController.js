import workoutModel from "../models/workoutModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import cloudinary from '../utils/cloudinary.js';




const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await workoutModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credential" });
    }

    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    let exists = await workoutModel.findOne({ email });

    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 7) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password (min. 7 characters)",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new workoutModel({
      userName,
      password: hashedPassword,
      email,
      exercises: [], // Ensure this matches your schema
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// const changeAccount = async (req, res) => {
//   const { userName, userId, email } = req.body;

//   try {
//     const user = await workoutModel.findById(userId);

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     user.userName = userName;
//     user.email = email;

//     if (req.file) {
//       user.image = req.file.filename;
//     }

//     await user.save();
//     res
//       .status(200)
//       .json({ success: true, user, message: "Update Successfully" });
//   } catch (error) {
//     console.error("Account Update Error:", error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

const changeAccount = async (req, res) => {
  const { userName, userId, email } = req.body;

  try {
    const user = await workoutModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.userName = userName;
    user.email = email;

    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images",

      });

      // Remove the file from local storage
      fs.unlinkSync(req.file.path);

      // Save the image URL in the user document
      user.image = result.secure_url;
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, user, message: "Update Successfully" });
  } catch (error) {
    console.error("Account Update Error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await workoutModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Compare the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid current password" });
    }

    // Hash the new Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfullyss" });
  } catch (error) {
    console.log("Password Change Error", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export { loginUser, registerUser, changeAccount, changePassword };
