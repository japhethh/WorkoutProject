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
    <div className={`flex flex-wrap oswald_jap md:w-4/6 w-6/6 mx-auto max-md:px-0 px-2 py-8 bg-background`}>
      <div className="w-full lg:w-1/6 flex justify-center px-4 ">
        <AddExercise darkMode={darkMode} />
      </div>
      <div className="w-full lg:w-5/6 px-4">
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