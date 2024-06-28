import Exercise from "../components/Exercise";
import AddExercise from "../components/AddExercise";

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="flex flex-wrap  w-5/6 mx-auto py-8 gap-10 ">
      <div className="w-full lg:w-1/5 flex justify-center ">

        <AddExercise />
      </div>
      <div className="w-full lg:w-3/5 ">

        <Exercise />
      </div>
    </div>
  )
}

export default Home