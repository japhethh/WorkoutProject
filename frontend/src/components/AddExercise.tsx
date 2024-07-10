import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { WorkoutContext } from '../context/WorkoutContext.tsx';

interface Data {
  name: string;
  set: any;
  rep: any;
  focusArea: string;
}

interface Dark {
  darkMode: string
}

const AddExercise = ({ darkMode }: Dark) => {
  const context = useContext(WorkoutContext);
  if (!context) {
    return null; // Or handle the case where context is null
  }
  const { apiURL, getAll, token, data } = context;

  const [info, setInfo] = useState<Data>({
    name: "",
    set: null,
    rep: null,
    focusArea: "",
  });

  useEffect(() => {
    console.log(info)
  }, [info])

  // Handiling the onChange in inputs
  const onHandleChanges = async (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handeling the submit into database
  const handleAdd = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/api/workout/add`, info, { headers: { token } });
      getAll();
      setInfo({ name: "", set: 0, rep: 0, focusArea: "" });
      toast.success(response.data.message);
    } catch (err) {
      console.log("Error adding exercise");
    }
  };

  if (!data) {
    return (
      <div className="p-4 w-full max-md:px-9">
        <div className="flex flex-col space-y-4">
          <div className="skeleton h-6 w-32 bg-gray-300"></div>
          <div className="skeleton h-10 w-full bg-gray-300"></div>
          <div className="skeleton h-10 w-full bg-gray-300"></div>
          <div className="skeleton h-10 w-full bg-gray-300"></div>
          <div className="skeleton h-12 w-full bg-gray-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <form onSubmit={handleAdd}>
        <div>
          <h1 className={`font-semibold text-md text-paragraph`}>Add a New Workout</h1>
        </div>

        <select
          className="select select-bordered bg-background text-paragraph w-full max-w-xs"
          name="focusArea"
          onChange={onHandleChanges}
          value={info.focusArea}
        >
          <option className='text-paragraph' disabled value="">
            Focus Area?
          </option>
          <option value="ARM">ARM</option>
          <option value="BACK">BACK</option>
          <option value="CHEST">CHEST</option>
          <option value="SHOULDER">SHOULDER</option>
          <option value="LEGS">LEGS</option>
        </select>
        <label className="form-control w-full max-w-xs mb-3">
          <div className="label">
            <span className="label-text text-paragraph">Exercise Name:</span>
          </div>
          <input value={info.name} type="text" onChange={onHandleChanges} name="name" placeholder="Type here" className="input border input-bordered w-full max-w-xs text-paragraph bg-background" />
        </label>

        <label className="form-control w-full max-w-xs mb-3">
          <div className="label">
            <span className="label-text text-paragraph">Set:</span>
          </div>
          <div className="indicator">
            <div className="tooltip tooltip-right z-10" data-tip="A group of exercises performed consecutively.">
              <span className="indicator-item indicator-start badge badge-primary"> </span>
            </div>
            <input value={info.set} type="text" onChange={onHandleChanges} name="set" placeholder="0" className="input border input-bordered w-full max-w-xs text-paragraph bg-background" />
          </div>
        </label>

        <label className="form-control w-full max-w-xs mb-3">
          <div className="label">
            <span className="label-text text-paragraph">Rep:</span>
          </div>
          <div className="indicator">
            <div className="tooltip tooltip-right z-10" data-tip="One complete exercise movement">
              <span className="indicator-item indicator-start badge badge-primary"> </span>
            </div>
            <input value={info.rep} type="text" onChange={onHandleChanges} name="rep" placeholder="0" className="input border input-bordered w-full max-w-xs text-paragraph bg-background" />
          </div>
        </label>

        <button type="submit" className={`justify-center items-center flex gap-2 py-3 px-5 font-semibold rounded-xl ${darkMode === "light" ? "bg-white text-[#1D232A]" : "bg-black text-white"}`}>
          Add New
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AddExercise;
