import { useEffect } from 'react';
import Store from '../context/Store'
const CreateExercise = () => {

  const { fetchExerciseData, exerciseData } = Store();

  useEffect(() => {
    fetchExerciseData()
  }, [])

  useEffect(() => {
    console.log(exerciseData)
  }, [exerciseData])


  return (
    <div className="min:h-screen h-auto w-full oswald_jap">
      <div className="h-32 md:h-48 bg-[#2A2A2A] ">
        <div className="flex items-center text-white text-3xl md:text-4xl font-semibold w-full h-full max-md:px-5 w-6/6 md:w-4/6 mx-auto">
          <h1 className="uppercase">Add Exercises</h1>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 py-5  shadow-xl text-paragraph ">
        <div className=" flex gap-1 uppercase ">
          <label htmlFor="">FOCUS AREA:</label>
          <select className="text-white bg-[#2A2A2A]" name="focusArea" id="focusArea">
            <option value="">Show All</option>
            <option value="Arm">Arm</option>
            <option value="Back">Back</option>
            <option value="Chest">Chest</option>
            <option value="FullBody">Full Body</option>
            <option value="Shoulder">Shoulder</option>
          </select>
        </div>

        <div className=" flex gap-1">
          <label htmlFor="">GENDER:</label>
          <select className=" text-white bg-[#2A2A2A]" name="gender" id="gender">
            <option value="">Show All</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
      </div>

      <div className="md:w-4/6 w-full px-4 md:px-0 mx-auto ">
        {/* <div>
          <h1>RECENT</h1>
        </div> */}


        {/* Exercise List */}

        <div className="flex py-5">
          <label htmlFor="newProgram" className='label text-paragraph'>New Program:</label>
          <input id="newProgram" type="text" className="input text-paragraph" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 ">
          {
            exerciseData?.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between shadow-xl p-3 rounded-sm ">
                <div className="flex gap-4 items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm rounded-full border-2 border-gray-500 checkbox-success" />
                    <div className="font-bold flex max-md:flex-row-reverse gap-2">
                      <div className="flex flex-col justify-center">
                        <h1 className="text-paragraph  md:text-xl text-sm ">{exercise?.name}</h1>
                        <p className="md:text-sm text-xs font-medium text-gray-500"><span className="font-bold text-paragraph">Equipment:</span> {exercise?.equipment}</p>
                        <p className="max-md:hidden text-sm font-medium text-gray-500"><span className="font-bold text-paragraph">Target Muscle Group:</span>{exercise?.targetMuscleGroup}</p>
                      </div>
                      <img className="md:w-32 md:h-32 h-16 w-16 md:ml-[100px] lg:ml-[300px]" src={exercise?.image ? exercise?.image : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"} alt="" />
                    </div>
                  </div>


                  <div>
                    <button className="md:py-2 md:px-6 px-4 py-1 rounded-sm bg-red-800 text-white hover:bg-red-800/80 text-xs">VIEW DETAILS</button>
                  </div>
                </div>
              </div>
            ))
          }


        </div>
      </div>
      {/* End */}
    </div >
  )
}

export default CreateExercise