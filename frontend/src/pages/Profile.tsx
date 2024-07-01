import { useContext, useState } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
// import upload_area from '../assets/upload_area.png';

const Profile = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    return null;
  }
  // URL
  const { userInfo  } = context;

  // const [image, setImage] = useState<any>(null); // State for image file
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onHandleInput = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleUpdate = async () => {
    // Add your update logic here
  };

  // const handleFileChange = (event: any) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };

  return (
    <div>
      <div className="py-4">
        <h1 className="text-2xl text-paragraph py-2">
          Hello,{" "}
          {userInfo.user && (
            <span className="text-orange-500 font-semibold">
              {userInfo.user.name}
            </span>
          )}
        </h1>
        <h1 className="italic text-[13px]">
          Change your profile information & password from here...
        </h1>
      </div>
      <div className="flex max-md:flex-col flex-row gap-4">
        <div className="shadow-xl border-[1px] border-gray-200 rounded-md p-3 w-1/2 max-md:w-full">
          <form onSubmit={handleUpdate} className="flex flex-col w-full" action="">
            <label className="text-sm py-2 text-headline" htmlFor="image">
              Profile Image <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center items-center">
              <label htmlFor="image" className="cursor-pointer">
                {/* <img
                  className="w-[80px] h-[80px] rounded-full"
                  src={image ? URL.createObjectURL(image) : upload_area}
                  alt="Upload Area"
                /> */}
              </label>
              <input
                hidden
                required
                // onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
              />

            </div>

            <label className="text-sm py-2 text-headline" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={onHandleInput}
              value={data.name}
              className="bg-background border-2 border-gray-200 text-paragraph input"
              name="name"
              type="text"
              id="name"
            />

            <label className="text-sm py-2 text-headline" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              onChange={onHandleInput}
              value={data.email}
              className="bg-background border-2 border-gray-200 text-paragraph input"
              name="email"
              type="email"
              id="email"
            />

            <button
              className="bg-primary w-[100px] text-white mt-4 py-2 px-1 rounded-sm flex justify-center items-center gap-2"
              type="submit"
            >
              <span className="text-sm font-normal">Update</span>{" "}
            </button>
          </form>
        </div>

        {/* Password section */}
        <div className="shadow-xl border-[1px] border-gray-200 rounded-md p-3 w-1/2 max-md:w-full flex flex-col">
          <label
            className="text-sm py-2 text-headline"
            htmlFor="currentpassword"
          >
            Current Password <span className="text-red-500">*</span>
          </label>
          <input
            onChange={onHandleInput}
            value={data.password}
            className="bg-background border-2 border-gray-200 text-paragraph input"
            name="password"
            type="password"
            id="currentpassword"
          />

          <label className="text-sm py-2 text-headline" htmlFor="newpassword">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            onChange={onHandleInput}
            value={data.password}
            className="bg-background border-2 border-gray-200 text-paragraph input"
            name="password"
            type="password"
            id="newpassword"
          />

          <label
            className="text-sm py-2 text-headline"
            htmlFor="confirmpassword"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            onChange={onHandleInput}
            value={data.password}
            className="bg-background border-2 border-gray-200 text-paragraph input"
            name="password"
            type="password"
            id="confirmpassword"
          />
          <button
            className="bg-primary w-[150px] text-white mt-4 py-2 px-2 rounded-sm flex justify-center items-center gap-2"
            type="submit"
          >
            <span className="text-sm font-normal">Update Password</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
