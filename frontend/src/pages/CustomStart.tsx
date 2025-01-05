import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../context/Store";
import { WorkoutContext } from "../context/WorkoutContext";
import { toast } from "react-toastify";

interface ExerciseId {
  _id: string;
  name: string;
  equipment: string;
  targetMuscleGroup: string;
  image: string
}

interface Exercises {
  exerciseId: ExerciseId;
  sets: number;
  reps: number;
  isCompleted: boolean;
}

interface ExerciseData {
  bundleName: string;
  exercises: Exercises[];
}

const CustomStart = () => {
  const [exerciseBundleData, setExerciseBundleData] = useState<ExerciseData | null>(null);
  const { token } = useContext(WorkoutContext)!;
  const { id } = useParams();
  if (!token) {
    return null;
  }

  useEffect(() => {
    fetchExerciseData();
  }, []);

  const fetchExerciseData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/user/bundle/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExerciseBundleData(response.data);
    } catch (error:any) {
      console.log(error?.response?.data?.message || "An error occurred");
    }
  };

  const handleCheckboxChange = (exerciseId: string) => {
    setExerciseBundleData((prevData) => {
      if (!prevData) return null;
      const updatedExercises = prevData.exercises.map((exercise) =>
        exercise.exerciseId._id === exerciseId
          ? { ...exercise, isCompleted: !exercise.isCompleted }
          : exercise
      );
      return { ...prevData, exercises: updatedExercises };
    });
  };


  const handleFinish = async () => {
    if (!exerciseBundleData) return;

    try {
      const response = await axios.post(
        `${apiURL}/api/user/finishExerciseBundle`,
        {
          bundleName: exerciseBundleData.bundleName,
          exercises: exerciseBundleData.exercises,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Bundle finished successfully:", response.data);
      toast.success("Bundle finished successfully")
      // navigate("/history");
    } catch (error:any) {
      console.log(error?.response?.data?.message || "An error occurred");

    }
  };

  return (
    <div className="min:h-screen h-auto w-full">
      <div>
        <div className="h-32 md:h-48 bg-[#2A2A2A]">
          <div className="flex items-center text-white text-3xl md:text-4xl font-normal w-full h-full max-md:px-5 w-6/6 md:w-4/6 mx-auto">
            <div className="flex flex-col gap-2">
              <h1 className="uppercase text-4xl">{exerciseBundleData?.bundleName}</h1>
              <h1 className="uppercase text-lg">Workout</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-md:px-5 w-6/6 lg:w-4/6 mx-auto">
        {exerciseBundleData?.exercises.map((exercise, index:number) => (
          <div
            key={index}
            className={`flex items-center justify-between shadow-xl p-3 rounded-sm oswald_jap ${exercise?.isCompleted ? "bg-green-100" : ""
              }`}
          >
            <div className="flex gap-4 items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exercise?.isCompleted}
                  onChange={() => handleCheckboxChange(exercise?.exerciseId?._id)}
                  className="checkbox rounded-none checkbox-sm border-2 border-gray-500 checkbox-success"
                />
                <div className="font-bold flex max-md:flex-row-reverse gap-2">
                  <div className="flex flex-col justify-center">
                    <h1 className="text-red-600 font-normal text-md">Exercise {index + 1}</h1>
                    <h1 className="uppercase font-normal md:text-xl text-sm">{exercise.exerciseId.name}</h1>
                    <p className="font-normal md:text-md text-xs">
                      Equipment: <span className="text-gray-500">{exercise.exerciseId.equipment}</span>
                    </p>
                    <a href="#" className="text-red-600 font-normal text-sm">
                      View Details
                    </a>
                  </div>
                  <img
                    className="md:w-32 md:h-32 h-16 w-16 md:ml-[100px] lg:ml-[300px]"
                    src={exercise?.exerciseId?.image}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-row gap-4 text-2xl text-normal text-center">
                  <div className="border-2 border-r-gray-500 border-l-gray-500">
                    <h1>{exercise.sets}</h1>
                    <p className="text-gray-500 text-sm px-3">SETS</p>
                  </div>
                  <div className="border-2 border-r-gray-500 border-l-gray-500">
                    <h1>{exercise.reps}</h1>
                    <p className="text-gray-500 text-sm px-3">REPS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center items-center">
          <button className="py-2 px-5 rounded-sm bg-paragraph hover:bg-paragraph/80 text-white my-4" onClick={handleFinish}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomStart;
