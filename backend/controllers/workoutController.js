import workoutModel from "../models/workoutModel.js";

const addWorkout = async (req, res) => {
  const { focusArea, name, set, rep, userId } = req.body;
  try {
    const user = await workoutModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Work out not found" });
    }

    const newExercise = {
      name: name,
      set: set,
      rep: rep,
      focusArea: focusArea,
    };

    user.exercises.push(newExercise);

    await user.save();
    res.status(200).json({ message: "Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getWorkout = async (req, res) => {
  const { userId } = req.body;
  try {
    const data = await workoutModel.findById(userId);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data });
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
      return res
        .status(400)
        .json({ success: false, message: "Workout not found" });
    }

    const exercise = user.exercises.id(exerciseId);
    if (!exercise) {
      return res
        .status(400)
        .json({ success: false, message: "Exercise not found" });
    }

    if (name) exercise.name = name;
    if (set) exercise.set = set;
    if (rep) exercise.rep = rep;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Exercise updated successfully",
      updatedExercise: exercise,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { exerciseId } = req.params;
  const { userId } = req.body;
  try {
    const workout = await workoutModel.findById(userId);
    if (!workout) {
      return res
        .status(400)
        .json({ success: false, message: "Workout not found" });
    }
    const exercise = workout.exercises.id(exerciseId);
    if (!exercise) {
      return res
        .status(400)
        .json({ success: false, message: "Exercise not found" });
    }
    workout.exercises.pull({ _id: exerciseId });
    await workout.save();
    res
      .status(200)
      .json({ success: true, message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { addWorkout, getWorkout, updateWorkout, deleteWorkout };
