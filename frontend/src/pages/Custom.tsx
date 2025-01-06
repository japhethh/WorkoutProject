import { useContext, useEffect, useState } from 'react'
import CustomList from '../components/CustomList'
import axios from 'axios'
import { WorkoutContext } from '../context/WorkoutContext'
import { apiURL } from '../context/Store'

import { Link } from 'react-router-dom'

interface Exercises {
  exerciseId: string,
  ref: string,
  sets: string,
  reps: string,
}

interface Filtering {
  _id: string,
  bundleName: string,
  exercises: Exercises,
  custom?: string
}




const Custom: React.FC = () => {
  const [getCustomData, setGetCustomData] = useState<Filtering[]>([])
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
      const response = await axios.get(`${apiURL}/api/user/bundle/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      // const datas = response?.data
      // const filterCustom = datas.filter((filtering: Filtering) => {
      //   return filtering?.custom === "custom"
      // })

      // console.log(filterCustom)
      console.log(response?.data)
      setGetCustomData(response?.data)

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
            getCustomData?.map((customer: Filtering, index: number) => (
              <div key={index} className="card bg-white  shadow-xl">
                <figure>
                  <img
                    src="https://images.pexels.com/photos/50597/man-male-boy-a-person-50597.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Shoes"
                    className="rounded-sm" />
                </figure>
                <div className="card-body items-center text-center font-semibold">
                  <h2 className="card-title text-gray-800">{customer?.bundleName}</h2>
                  <p className="text-red-600">Beginners</p>
                  <div className="card-actions">
                    <Link to={`/custom/${customer?._id}`} className=" bg-buttonPrimary
 rounded-sm hover:bg-buttonPrimary/80 py-2 px-6 text-white border-2 border-paragraph">Start</Link>
                    <button className="
bg-blue-600 rounded-sm hover:bg-blue-600/80 py-2 px-6 text-white border-2 border-blue-500">Edit</button>
                    {/* <button className='bg-white-700 text-red-500 border-2 border-red-500  rounded-sm hover:bg-red-600/80 py-2 px-5 hover:text-white'>Delete</button> */}
                  </div>
                </div>
              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Custom