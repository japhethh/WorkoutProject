import { useContext } from "react";
import DefaultImage from '../assets/defaultLogo.png';
import { WorkoutAdminContext } from '../context/WorkoutAdminContext';

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

const Users = () => {
  const context = useContext(WorkoutAdminContext);

  if (!context) {
    return null;
  }

  const { data } = context;


  if (!data) {
    return (
      <div>Loading</div>
    )
  }

  // Ensure that data is an array
  const users: User[] = Array.isArray(data) ? data : [];

  return (
    <div className=" ">
      <div className="overflow-y-scroll h-[450px] w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Exercises</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user: User) => (
              <tr key={user._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.image ? user.image : DefaultImage}
                          alt="Avatar Tailwind CSS Component"
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
                <td>Purple</td>
                <th>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-md">...</label>

                    <ul tabIndex={0} className={`dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow  ${user.exercises.length === 0 ? "h-32" : "overflow-y-scroll h-96"} `}>
                      {user.exercises.length === 0 ? (
                        <>
                          <div className="flex justify-center items-center h-24">
                            <h1>Empty</h1>
                          </div>
                        </>) : user.exercises.map((exercise: Item, index: number) => (
                          <li key={index} className="p-2 ">
                            <h1 className="">Name: {exercise.name}</h1>
                            <h1 className="">Set: <span className="text-red-400">{exercise.set}</span></h1>
                            <h1 className="text-paragraph">Rep: <span className="text-red-400">{exercise.rep}</span></h1>

                          </li>
                        ))}
                    </ul>

                  </div>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Exercises</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex justify-center items-center py-2">
        <div className="join ">
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="1"
            defaultChecked
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="2"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="3"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="4"
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
