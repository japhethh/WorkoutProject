import { useContext, useEffect } from 'react'
import CustomList from '../components/CustomList'
import shoulder_workout from '../assets/shoulder-workout-for-beginners.png'
import axios from 'axios'
import { WorkoutContext } from '../context/WorkoutContext'
import { apiURL } from '../context/Store'


const Custom: React.FC = () => {

  const context = useContext(WorkoutContext);

  if (!context) {
    return null;
  }

  const { token } = context;


  useEffect(() => {
    fetchExerciseBundle()
  }, [])

  const fetchExerciseBundle = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/user/bundle`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response?.data)
    } catch (error: any) {
      console.log(error?.response.data.message)
    }
  }
  return (
    <div className="min:h-screen h-auto w-full oswald_jap">
      <CustomList />

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

      {/* Work out List */}
      <div className="max-md:px-5 w-6/6 md:w-4/6 mx-auto ">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-4">


          {/* List */}
          {

          }
          <div className="card bg-white  shadow-xl">
            <figure>
              <img
                src={shoulder_workout}
                alt="Shoes"
                className="rounded-sm" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-paragraph">SHOULDER WORKOUT FOR BEGINNERS</h2>
              <p className="text-red-500">Beginners</p>
              <div className="card-actions">
                <button className="
      bg-red-600 rounded-sm hover:bg-red-600/80 py-2 px-6 text-white">View Details</button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Custom