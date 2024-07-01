import workoutModel from '../models/workoutModel.js'
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import validator from 'validator';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await workoutModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credential" });
    }

    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const createToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET) 
}

const registerUser = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    let exists = await workoutModel.findOne({ email });

    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 7) {
      return res.status(400).json({ success: false, message: "Please enter a strong password (min. 7 characters)" });
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

const changeAccount = async (req,res) => {
  const image_filename = `${req.file.filename}`;

  const {userId,userName,email,password} = req.body;

  try {
     const salt = await bcrypt.genSalt(10);
     const hashedpassword = await bcrypt.hash(password, salt);
  const updateUser = await workoutModel.findByIdAndUpdate(
    userId,
    {
    userName:userName,
    email:email,
    image:image_filename,
    password:hashedpassword
  });
  const user = await updateUser.save();
  console.log(user)
  res.json({success:true,user,message:"Update Successfully"})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
}
}
export { loginUser, registerUser,changeAccount };
