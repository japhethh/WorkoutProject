import React, { useContext, useState } from "react";
import DefaultImage from "../assets/defaultLogo.png";
import { WorkoutAdminContext } from "../context/WorkoutAdminContext";
import axios from "axios";
import { RiDeleteBinFill } from "react-icons/ri";
import { toast } from "react-toastify";

interface User {
  userName: string;
  email: string;
  image: string;
  _id: string;
  exercises: Item[];
}

interface Item {
  name: string;
  set: number;
  rep: number;
}

const Users: React.FC = () => {
  const context = useContext(WorkoutAdminContext);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  if (!context) {
    return null;
  }

  const { data, apiURL, getAllUser } = context;

  if (!data) {
    return <div>Loading...</div>;
  }
  const handleDeleteUser = async (userId: string) => {
    console.log("Deleting user with userId:", userId); // Log userId here

    try {
      const response = await axios.post(`${apiURL}/api/admin/deleteUser`, { userId });
      console.log("Delete response:", response); // Log response from API

      toast.success(response.data.message);
      getAllUser();
      setCurrentUserId(null);

    } catch (error: any) {
      toast.error("Error");
    }
  };



  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      const updatedSelectedUsers = new Set(prevSelectedUsers);
      if (updatedSelectedUsers.has(userId)) {
        updatedSelectedUsers.delete(userId);
      } else {
        updatedSelectedUsers.add(userId);
      }
      return updatedSelectedUsers;
    });
  };

  // Ensure that data is an array
  const users: User[] = Array.isArray(data) ? data : [];

  return (
    <div className="container mx-auto px-2 overflow-y-scroll h-5/6">
      <div className="">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Id</th>
              <th>Exercises</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <th className="">
                  <label className="mr-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => handleCheckboxChange(user._id)}
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.image ? user.image : DefaultImage}
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.userName}</div>
                      <div className="text-sm opacity-50">Philippines</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>
                <td>{user._id}</td>
                <th>
                  <div className="dropdown dropdown-end">
                    {
                      user.exercises.length === 0
                        ?
                        (
                          <label tabIndex={0} className="btn btn-ghost btn-sm bg-gray-100 rounded-full ">details</label>
                        ) :
                        (
                          <div className="indicator">
                            <span className="indicator-item badge badge-primary"></span>
                            <label tabIndex={0} className="btn btn-ghost btn-sm bg-gray-100 rounded-full ">details</label>
                          </div>
                        )
                    }
                    <ul
                      tabIndex={0}
                      className={`dropdown-content bg-white rounded-lg z-[10] mt-3 w-52 p-2 shadow ${user.exercises.length === 0 ? "h-32" : "overflow-y-auto max-h-72"}`}
                    >
                      {user.exercises.length === 0 ? (
                        <div className="flex justify-center items-center h-24">
                          <h1 className="text-gray-500">Empty</h1>
                        </div>
                      ) : (
                        user.exercises.map((exercise: Item, index: number) => (
                          <li key={index} className="p-2 border-b border-gray-200">
                            <h1 className="text-gray-800">Name: {exercise.name}</h1>
                            <h1 className="text-gray-600">
                              Set: <span className="text-blue-500">{exercise.set}</span>
                            </h1>
                            <h1 className="text-gray-600">
                              Rep: <span className="text-blue-500">{exercise.rep}</span>
                            </h1>
                          </li>
                        ))
                      )}
                    </ul>

                  </div>
                </th>
                <td>
                  {selectedUsers.has(user._id) && (
                    <div
                      className="btn btn-ghost btn-md"
                      onClick={() => setCurrentUserId(user._id)}
                    >
                      <RiDeleteBinFill className="text-2xl text-red-500" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Id</th>
              <th>Exercises</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div >
      {currentUserId && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete User</h3>
            <p className="py-4">Are you sure you want to delete this user?</p>
            <div className="modal-action">
              <button
                className="btn mr-3"
                onClick={() => handleDeleteUser(currentUserId)}
              >
                Delete
              </button>
              <button className="btn" onClick={() => setCurrentUserId(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div >
  );
};

export default Users;
