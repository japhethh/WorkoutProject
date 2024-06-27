import { useContext, useEffect, useState } from "react";
import { PiTrashSimpleFill } from "react-icons/pi";
import { WorkoutContext } from '../context/WorkoutContext.tsx';

const Exercise = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    return null; // Or handle the case where context is null
  }

  const { URL, getAll, data, handleDelete } = context; // Assuming URL is provided by WorkoutContext

  interface Item {
    name: string;
    set: number;
    rep: number;
    _id: string;
  }

  // const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    getAll()
  }, []);

  if (!data) {
    return <div>Loading...</div>
  }
  return (
    <div className="max-md:overflow-y-auto overflow-y-scroll lg:h-[500px]">

      <div>
        {
          data && data.exercises && (
            data.exercises.map((item: Item, index: number) => (
              <div key={index} className="shadow-md rounded-md p-4 mb-2">
                <div className="flex justify-between items-center">
                  <h1 className="text-md text-green-600 font-semibold">
                    {item.name}
                  </h1>
                  <button type="button" className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>
                    <PiTrashSimpleFill />
                  </button>
                  <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p className="py-4">Press ESC key or click the button below to close</p>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn mr-3" onClick={() => handleDelete(item._id)}>Delete</button>
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
                <div>
                  <h1>Exercise: {item.name}</h1>
                  <h1>Sets: {item.set}</h1>
                  <h1>Reps: {item.rep}</h1>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Exercise;
