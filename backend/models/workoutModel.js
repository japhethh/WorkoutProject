import mongoose from "mongoose";

const workoutscheme = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
  exercises:[
    {
      name:{
        type:String,
        required:true,
      },
      set:{
        type:Number,
        required:true
      },
      req:{
        type:Number,
        required:true,
      },

    }
  ]


});

const workoutModel = mongoose.model("Workout",workoutscheme);

export default workoutModel;
