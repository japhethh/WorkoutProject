import { useContext } from "react";

import { WorkoutAdminContext } from '../context/WorkoutAdminContext';

interface User {
  userName: string;
  email: string;
  image:string;
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

  const { userInfo } = context;

  return (
    <div>
      <div className="overflow-x-auto">
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
              <th></th>
            </tr>
          </thead>
          <tbody>



            {/* row 1 */}
            {userInfo.user && userInfo.user.exercises && userInfo.user.map((item: User, index: number) => (
              <tr key={item.email}>
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
                          src={item.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.userName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
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
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex justify-center items-center">
        <div className="join ">
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="1"
            defaultChecked />
          <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
          <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
          <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
        </div>
      </div>
    </div>
  )
}

export default Users