import mongoose from "mongoose";

const workoutscheme = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  image:{
    type:String
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
  exercises:[
    {
      focusArea:{
        type:String,
        required:true,
      },
      name:{
        type:String,
        required:true,
      },
      set:{
        type:Number,
        required:true
      },
      rep:{
        type:Number,
        required:true,
      },

    }
  ]


},{timestamps: true});

const workoutModel = mongoose.model("Workout",workoutscheme);

export default workoutModel;
