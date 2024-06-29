import axios from 'axios';
import  { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { WorkoutContext } from '../context/WorkoutContext.tsx';

interface Data {
  name: string;
  set: number;
  rep: number;
}

const AddExercise = () => {


  const context = useContext(WorkoutContext);
  if (!context) {
    return null; // Or handle the case where context is null
  }
  const { URL, getAll,token } = context;

  const [data, setData] = useState<Data>(
    {
      name: "",
      set: 0,
      rep: 0,
    }
  );

  // Handiling the onChange in inputs
  const onHandleChanges = async (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value }))
    console.log(data)
  }

  // Handeling the submit into database
  const handleAdd = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/workout/add`, data,{headers:{token}})
      getAll();
      console.log(response)
      setData({name:"",set:0,rep:0})
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Error")
    }

  }

  return (
    <div className="">
      <form onSubmit={handleAdd}>
        <div>
          <h1 className="font-semibold text-md">
            Add a New Workout
          </h1>
        </div>
        <label className="form-control w-full max-w-xs mb-3">
          <div className="label">
            <span className="label-text">Exercise Name:</span>
          </div>
          <input value={data.name} type="text" onChange={onHandleChanges} name="name" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

        </label>
        <label className="form-control w-full max-w-xs mb-3">
          <div className="label">
            <span className="label-text">Set:</span>
          </div>
          <input value={data.set} type="text" onChange={onHandleChanges} name="set" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

        </label>
        <label className="form-control w-full max-w-xs mb-3">
          <div className="label">
            <span className="label-text">Rep:</span>
          </div>
          <input value={data.rep} type="text" onChange={onHandleChanges} name="rep" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

        </label>

        <button type='submit' className="btn">
          Add New
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default AddExercise