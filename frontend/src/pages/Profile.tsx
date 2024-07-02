import React, { useContext, useEffect, useState } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import axios from "axios";
import { toast } from "react-toastify";
import defaultLogo from '../assets/defaultLogo.png';

interface ProfileInfo {
  userName: string;
  email: string;
}

const Profile: React.FC = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    return null;
  }

  const { userInfo, apiURL, token, getAll } = context;

  const [image, setImage] = useState<File | null>(null);

  const [data, setData] = useState<ProfileInfo>(() => {
    const storedData = sessionStorage.getItem("profileData");
    return storedData ? JSON.parse(storedData) : {
      userName: userInfo.user ? userInfo.user.userName : "",
      email: userInfo.user ? userInfo.user.email : "",
      password: ""
    };
  });

  useEffect(() => {
    sessionStorage.setItem("profileData", JSON.stringify(data));
    console.log(data)
  }, [data]);

  const onChangeProfileinfo = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onHandleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`${apiURL}/api/user/profile`, formData,{ headers: { token } })

      if (response.data.success) {
        await getAll();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error during login:", error); // Log the error for debugging
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login. Please try again.");
      }
    } 
  };

  return (
    <div className="max-md:px-5">
      <div className="py-4 ">
        <h1 className="text-2xl text-paragraph py-2">
          Hello,
          {userInfo.user && (
            <span className="text-violet-700 font-semibold">
              {userInfo.user.userName}
            </span>
          )}
        </h1>
        <h1 className="italic text-[13px] text-paragraph">
          Change your profile information & password from here...
        </h1>
      </div>
      <div className="flex max-md:flex-col flex-row gap-4">
        <div className="shadow-xl  rounded-md p-3 w-1/2 max-md:w-full">
          <form onSubmit={onHandleSubmit} className="flex flex-col w-full">
            <label className="text-sm py-2 text-headline" htmlFor="image">
              Profile Image <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center items-center">
              <label htmlFor="image" className="cursor-pointer">
                <img
                  className="w-[80px] h-[80px] rounded-full object-cover"
                  src={image ? URL.createObjectURL(image) : defaultLogo}
                  alt="Upload Area"
                />
              </label>
              <input
                hidden
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                accept="image/*"
                type="file"
                id="image"
              />
            </div>

            <label className="text-sm py-2 text-headline" htmlFor="userName">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={onChangeProfileinfo}
              value={data.userName}
              className="input border input-bordered w-full  text-paragraph bg-background "
              name="userName"
              type="text"
              id="userName"
            />
            <label className="text-sm py-2 text-headline" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              onChange={onChangeProfileinfo}
              value={data.email}
              className="input border input-bordered w-full text-paragraph bg-background cursor-not-allowed disabled:bg-background disabled:text-gray-400 disabled:border-none"
              name="email"
              type="email"
              id="email"
              disabled
            />


            <button
              className="bg-primary w-[100px] text-white mt-4 py-2 px-1 rounded-sm flex justify-center items-center gap-2"
              type="submit"
            >
              <span className="text-sm font-normal">Update</span>
            </button>
          </form>
        </div>

        {/* Password section */}
        <div className="shadow-xl  rounded-md p-3 w-1/2 max-md:w-full flex flex-col">
          <label className="text-sm py-2 text-headline" htmlFor="currentpassword">
            Current Password <span className="text-red-500">*</span>
          </label>
          <input
            // onChange={onChangeHandle}
            // value={data.password}
            className="input border input-bordered w-full  text-paragraph bg-background "
            name="password"
            type="password"
            id="currentpassword"
          />

          <label className="text-sm py-2 text-headline" htmlFor="newpassword">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            // onChange={onChangeHandle}
            // value={data.password}
            className="input border input-bordered w-full  text-paragraph bg-background "
            name="password"
            type="password"
            id="newpassword"
          />

          <label className="text-sm py-2 text-headline" htmlFor="confirmpassword">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            // onChange={onChangeHandle}
            // value={data.password}
            className="input border input-bordered w-full  text-paragraph bg-background "
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
