import Exercise from "../components/Exercise";
import Help from "../components/Help";
import AddExercise from "../components/AddExercise";
import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext"
interface Dark {
  darkMode: string;
}

const Home = ({ darkMode }: Dark) => {
  const context = useContext(WorkoutContext);

  if (!context) {
    return null;
  }

  const { token } = context;
  return (
    <div className={`flex flex-wrap  w-5/6 mx-auto py-8 gap-10 bg-background`}>
      <div className="w-full lg:w-1/5 flex justify-center ">

        <AddExercise darkMode={darkMode} />
      </div>
      <div className="w-full lg:w-3/5 ">

        <Exercise darkMode={darkMode} />
      </div>
      {token ?
        <Help />
        : <></>
      }
    </div>
  )
}

export default Home