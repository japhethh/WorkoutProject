import { useEffect, useState } from "react";
import Store, { apiURL } from "../context/Store";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import SectionTitle from "./SectionTitle";

interface Exercise {
  _id: string;
  name: string;
  equipment?: string;
  targetMuscleGroup?: string;
  image?: string;
  gender?: string; // Assuming the data includes a gender field
}

interface FormData {
  newProgram: string;
}

const CreateExercise: React.FC = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    return null;
  }

  const { token } = context;
  const { fetchExerciseData, exerciseData } = Store();
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [focusArea, setFocusArea] = useState<string>("");

  useEffect(() => {
    fetchExerciseData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleCheckboxChange = (exerciseId: string) => {
    setSelectedExercises((prevSelected) =>
      prevSelected.includes(exerciseId)
        ? prevSelected.filter((id) => id !== exerciseId) // Uncheck: remove from array
        : [...prevSelected, exerciseId] // Check: add to array
    );
  };

  const filteredExercises = exerciseData?.filter((exercise: Exercise) => {
    const matchesFocusArea = focusArea ? exercise.targetMuscleGroup === focusArea : true;
    return matchesFocusArea;
  });

  const onSubmit = async (data: FormData) => {
    if (selectedExercises.length === 0) {
      toast.error("Please select at least one exercise.");
      return;
    }

    const formData = {
      ...data,
      exercises: selectedExercises,
    };

    try {
      const response = await axios.post(`${apiURL}/api/user/bundle`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.message);
      setSelectedExercises([]); // Reset selected exercises after success
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min:h-screen h-auto w-full oswald_jap">
      {/* Adding Section */}
      <SectionTitle title="Add Exercise" />
      <div className="flex justify-center items-center gap-5 py-5 shadow-xl text-paragraph">
        <div className="flex gap-1 uppercase">
          <label htmlFor="focusArea">FOCUS AREA:</label>
          <select
            className="text-white bg-[#2A2A2A]"
            id="focusArea"
            onChange={(e) => setFocusArea(e.target.value)}
          >
            <option value="">Show All</option>
            <option value="Arm">Arm</option>
            <option value="Back">Back</option>
            <option value="Chest">Chest</option>
            <option value="FullBody">Full Body</option>
            <option value="Shoulder">Shoulder</option>
          </select>
        </div>

        {/* <div className="flex gap-1">
          <label htmlFor="gender">GENDER:</label>
          <select
            className="text-white bg-[#2A2A2A]"
            id="gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Show All</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div> */}

      </div>

      <div className="md:w-4/6 w-full px-4 md:px-0 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex py-5">
            <label htmlFor="newProgram" className="label text-paragraph">
              New Program:
            </label>
            <input
              id="newProgram"
              {...register("newProgram", { required: "Program name is required" })}
              type="text"
              className="input text-paragraph"
            />
            {errors.newProgram && (
              <p className="text-red-500 text-sm">{errors.newProgram.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
            {filteredExercises?.map((exercise: Exercise, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between shadow-xl p-3 rounded-sm"
              >
                <div className="flex gap-4 items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded-full border-2 border-gray-500 checkbox-success"
                      onChange={() => handleCheckboxChange(exercise._id)}
                      checked={selectedExercises.includes(exercise._id)}
                    />
                    <div className="font-bold flex max-md:flex-row-reverse gap-2">
                      <div className="flex flex-col justify-center">
                        <h1 className="text-paragraph md:text-xl text-sm">
                          {exercise?.name}
                        </h1>
                        <p className="md:text-sm text-xs font-medium text-gray-500">
                          <span className="font-bold text-paragraph">
                            Equipment:
                          </span>{" "}
                          {exercise?.equipment}
                        </p>
                        <p className="max-md:hidden text-sm font-medium text-gray-500">
                          <span className="font-bold text-paragraph">
                            Target Muscle Group:
                          </span>{" "}
                          {exercise?.targetMuscleGroup}
                        </p>
                      </div>
                      <img
                        className="md:w-32 md:h-32 h-16 w-16 md:ml-[100px] lg:ml-[300px]"
                        src={
                          exercise?.image ||
                          "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                        }
                        alt="Exercise"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="md:py-2 md:px-6 px-4 max-md:w-24 py-1 rounded-sm bg-red-800 text-white hover:bg-red-800/80 text-xs"
                    >
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="py-5">
            <button type="submit" className="btn text-white border-none bg-buttonPrimary hover:bg-buttonPrimary/80 focus:bg-paragraph/80">
              Create New Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExercise;
