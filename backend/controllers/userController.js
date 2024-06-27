import workoutModel from "../models/workoutModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (req,res) => {
  const {email, password } = req.body;

  try {
    const user = await workoutModel.findOne(email);

    if(!user){
      return res.status(400).json({success:false,message:"User doesn't Exist"});
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({success:false,message:"Invalid credentials"});
    }

    const token = createToken(user._id);
    res.status(200).json({success:true,token});
  } catch (error) {
    console.log(error);
    res.status(400).json({success:false,message:"Errors"});
  }
}

const createToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET);
}


const registerUser = async (req,res) => {
  const {userName, password,email} = req.body;
  try {
    const exists  = await workoutModel.findOne({email});

    if(exists){
      return res.status(400).json({success:false,message:"User already Exist "})
    }

    if(!validator.isEmail(email)){
      return res.status(400).json({success:false,message:"Please enter a valid Email"});
    }

    if(password.length < 8) {
      return res.status(400).json({success:false,message:"Please  enter a strong Password"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = new workoutModel({
      userName:userName,
      password:hashedPassword,
      exercises:[]
    })


    try {
        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(200).json({success:true,token})
    } catch (error) {
      console.log(error)
      res.status(400).json({success:false,message:"Error"})
    }
  } catch (error) {
    
  }
}

export {login,registerUser}
