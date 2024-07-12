import { useContext, useEffect, useState } from "react";
import { PiTrashSimpleFill } from "react-icons/pi";
import { WorkoutContext } from '../context/WorkoutContext';
// import { IoOptionsOutline } from "react-icons/io5";


interface Dark {
  darkMode: string;
}

const Exercise = ({ darkMode }: Dark) => {
  const context = useContext(WorkoutContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  if (!context) {
    return null; // Handle the case where context is null
  }

  const { getAll, data, handleDelete } = context;

  useEffect(() => {
    getAll();
  }, []);

  const openModal = (itemId: string) => {
    setSelectedItemId(itemId);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedItemId(null);
    setShowModal(false);
  };

  const handleDeleteClick = (itemId: string) => {
    handleDelete(itemId);
    closeModal();
  };


  const handleFilterClick = (bodyPart: string) => {
    setFilter((prevFilter) => (prevFilter === bodyPart ? "ALL" : bodyPart))
  }


  if (!data) {
    return (
      <div className="bg-gray-300  rounded-xl w-full p-5">
        <div className="flex justify-between items-center">
          <div className="skeleton mb-3 h-6 w-32 bg-background"></div>
          <div className="skeleton mb-3 h-7 w-10 bg-background"></div>
        </div>
        <div className="skeleton h-6 w-20 mb-2 bg-background"></div>
        <div className="skeleton h-6 w-20 bg-background"></div>
      </div>
    )
  }

  const filterExercises = filter === "ALL" ? data.exercises : data.exercises.filter((item) => item.focusArea === filter);

  return (
    <div >

      <div>
        <ul className="flex gap-2 text-lg text-paragraph font-semibold cursor-pointer max-md:overflow-x-scroll max-md:w-6/6 max-md:mx-auto   max-md:border-b-2 max-md:border-gray-500 py-3 px-1  ">
          <li className={`px-2 py-1  rounded-md ${filter === "ARM" ? "bg-[#D7DFFF] text-[#4F46E5]" : "bg-gray-200 text-gray-800"}`}
            onClick={() => handleFilterClick("ARM")}>ARM</li>
          <li className={`px-2 py-1  rounded-md ${filter === "BACK" ? "bg-[#D7DFFF] text-[#4F46E5]" : "bg-gray-200 text-gray-800"}`}
            onClick={() => handleFilterClick("BACK")}>BACK</li>
          <li className={`px-2 py-1  rounded-md ${filter === "CHEST" ? "bg-[#D7DFFF] text-[#4F46E5]" : "bg-gray-200 text-gray-800"}`}
            onClick={() => handleFilterClick("CHEST")}>CHEST</li>
          <li className={`px-2 py-1  rounded-md ${filter === "SHOULDER" ? "bg-[#D7DFFF] text-[#4F46E5]" : "bg-gray-200 text-gray-800"}`}
            onClick={() => handleFilterClick("SHOULDER")}>SHOULDER</li>
          <li className={`px-2 py-1  rounded-md ${filter === "LEGS" ? "bg-[#D7DFFF] text-[#4F46E5]" : "bg-gray-200 text-gray-800"}`}
            onClick={() => handleFilterClick("LEGS")}>LEGS</li>
        </ul>
      </div>
      <div className="max-md:overflow-y-auto overflow-y-scroll lg:h-[420px]">
        <div>
          {filterExercises.length === 0 ? (
            <>
              <div className="text-center text-paragraph flex justify-center items-center h-64 w-full">
                No exercises available
              </div>
            </>
          )
            :
            filterExercises.map((item) => (
              <div key={item._id} className="shadow-md rounded-md p-4 mb-2">
                <div className="flex justify-between items-center">
                  <h1 className="text-md text-green-600 font-semibold">
                    {item.name}
                  </h1>
                  <button
                    type="button"
                    className="bg-gray-200 rounded-md p-3 "
                    onClick={() => openModal(item._id)}
                  >
                    <PiTrashSimpleFill className="text-paragraph" />
                  </button>
                </div>
                <div className="text-paragraph">
                  <h1>Focus Area: <span className="font-semibold">{item.focusArea}</span></h1>
                  <h1>Sets: <span className="font-semibold">{item.set}</span></h1>
                  <h1>Reps:  <span className="font-semibold">{item.rep}</span></h1>
                </div>
              </div>
            ))
          }


        </div>

        {selectedItemId && (
          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open={showModal}>
            <div className="modal-box bg-background border">
              <h3 className="font-bold text-lg text-paragraph">Confirm Deletion</h3>
              <p className="py-4 text-paragraph">Are you sure you want to delete this exercise?</p>
              <div className="modal-action">
                <button
                  className={`justify-center items-center flex gap-2 py-3 px-5 font-semibold rounded-xl ${darkMode === "light" ? "bg-white text-[#1D232A]" : "bg-black text-white"}`}
                  onClick={() => handleDeleteClick(selectedItemId)}
                >
                  Delete
                </button>
                <button
                  className={`justify-center items-center flex gap-2 py-3 px-5 font-semibold rounded-xl ${darkMode === "light" ? "bg-white text-[#1D232A]" : "bg-black text-white"}`}
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default Exercise;
