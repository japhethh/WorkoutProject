import workoutModel from "../models/workoutModel.js";

const allUser = async (req, res) => {
  try {
    const users = await workoutModel.find({});
    if (!users) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.body; // Retrieve userId from request body

  try {
    const user = await workoutModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "Delete Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};


export { allUser, deleteUser };
