import workoutModel from "../models/workoutModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const login = async (req,res) => {
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

export {login}
