import workoutModel from "../models/workoutModel.js";

const addWorkout = async (req, res) => {
  const { userName, exercises } = req.body;
  try {
    const newAccount = new workoutModel({
      userName,
      exercises,
    });

    await newAccount.save();
    res.status(200).json({ message: "Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getWorkout = async (req, res) => {
  try {
    const getAll = await workoutModel.find({});
    res.status(200).json({ success: true, data: getAll });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Error" });
  }
};


const updateWorkout = async (req, res) => {
  const { id, exerciseId } = req.params;
  const { name, set, rep } = req.body;

  try {
    const user = await workoutModel.findById(id);

    if (!user) {
      return res.status(400).json({ success: false, message: "Workout not found" });
    }

    const exercise = user.exercises.id(exerciseId);

    if (!exercise) {
      return res.status(400).json({ success: false, message: "Exercise not found" });
    }

    if (name) exercise.name = name;
    if (set) exercise.set = set;
    if (rep) exercise.req = rep;

    await user.save();

    res.status(200).json({ success: true, message: "Exercise updated successfully", updatedExercise: exercise });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export { addWorkout, getWorkout, updateWorkout };
