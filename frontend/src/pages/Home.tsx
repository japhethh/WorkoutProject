import Exercise from "../components/Exercise";
import AddExercise from "../components/AddExercise";

interface Dark{
  darkMode:string;
}

const Home = ({darkMode}:Dark) => {
  return (
    <div className={`flex flex-wrap  w-5/6 mx-auto py-8 gap-10 bg-background`}>
      <div className="w-full lg:w-1/5 flex justify-center ">

        <AddExercise darkMode={darkMode}/>
      </div>
      <div className="w-full lg:w-3/5 ">

        <Exercise darkMode={darkMode}/>
      </div>
    </div>
  )
}

export default Home