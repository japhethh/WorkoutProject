import { Link } from "react-router-dom"
import SectionTitle from "../components/SectionTitle"
import { useEffect, useState } from "react"
import { apiURL } from "../context/Store";
import axios from "axios";

interface ExerciseList {
  name: string;
  equipment: string;
  targetMuscleGroup: string;
  description: string;
  image: string;
  level: string
}
// Date: 12/29/2024
const Exercise_list = () => {
  const [exerciseList, setExerciseList] = useState<ExerciseList | null>(null)

  useEffect(() => {
    fetchExerciseList();
  }, [])

  const fetchExerciseList = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/user/exercise`)
      setExerciseList(response.data)
    } catch (error) {
      console.log(error?.response.data.message)
    }
  }

  // console.log(exerciseList)



  return (
    <div >
      <SectionTitle title="Exercise List" />
      <div className="flex justify-center items-center gap-5 py-5 shadow-xl text-paragraph">
        <div className="flex gap-1 uppercase">
          <label htmlFor="goal">Goal: </label>
          <select
            className="text-white bg-[#2A2A2A]"
            id="goal"
            name="goal"
          // onChange={(e) => setFocusArea(e.target.value)}
          >
            <option value="">Show All</option>
            <option value="Arm">Arm</option>
            <option value="Back">Back</option>
            <option value="Chest">Chest</option>
            <option value="FullBody">Full Body</option>
            <option value="Shoulder">Shoulder</option>
          </select>
        </div>
      </div>
      <div className="max-md:px-5 w-6/6 lg:w-4/6 mx-auto">
        {
          exerciseList?.map((exercise: ExerciseList, index: number) => (
            <div
              className={`flex items-center justify-between shadow-xl p-3 rounded-sm oswald_jap `}
            >
              <div className="flex gap-4 items-center justify-between w-full">
                <div className="flex items-center gap-2 px-2">
                  <div className="font-bold flex max-md:flex-row-reverse gap-2">
                    <div className="flex flex-col justify-center">
                      <h1 className="uppercase font-normal text-xl text-paragraph">{exercise?.name}</h1>
                      <p className="uppercase font-normal text-sm text-gray-800  text-paragraph">Equipment: <span className="text-gray-500">{exercise?.equipment}</span></p>
                      <p className="uppercase font-normal text-sm text-gray-800  text-paragraph">Primary Muscles: <span className="text-gray-500">{exercise?.targetMuscleGroup}</span></p>
                    </div>
                    <img
                      className="md:w-20 md:h-20 h-16 w-16 md:ml-[100px] lg:ml-[300px]"
                      src={exercise?.image ? exercise?.image : "https://fitnessprogramer.com/wp-content/uploads/2021/02/fitness-model.png"}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="flex flex-row gap-4 text-2xl text-normal text-center">
                    <Link to="/details" className="text-white py-2 px-5 bg-red-700 rounded-s font-normal text-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )
}

export default Exercise_list