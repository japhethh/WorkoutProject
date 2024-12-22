import React, { useContext, useEffect, useState } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import axios from "axios";
import { toast } from "react-toastify";
import DefaultLogo from '../assets/defaultLogo.png'
interface ProfileInfo {
  userName: string;
  email: string;
}

interface Password {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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
    };
  });

  const [pass, setPass] = useState<Password>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    sessionStorage.setItem("profileData", JSON.stringify(data));
    console.log(data);
    console.log(image);
    console.log(pass)
  }, [data, image, pass]);

  const onChangeProfileinfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`${apiURL}/api/user/profile`, formData, { headers: { token } });

      if (response.data.success) {
        await getAll();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error during profile update:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during profile update. Please try again.");
      }
    }
  };

  const handleChangePassword = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setPass((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPassword = async (e: any) => {
    e.preventDefault();
    const formData = {
      currentPassword: pass.currentPassword,
      newPassword: pass.newPassword
    };
    if (pass.newPassword !== pass.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.post(`${apiURL}/api/user/changePassword`, formData, {
        headers: {
          token
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setPass({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(response.data.message);
      }


    } catch (error: any) {
      console.error("Error during changePassword:", error.message);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="max-md:px-5 container mx-auto py-2 px-7">
      <div className="py-4">
        <h1 className="text-2xl text-paragraph py-2">
          Hello,{" "}
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
        <div className="shadow-xl rounded-md p-3 w-1/2 max-md:w-full">
          <form onSubmit={onHandleSubmit} className="flex flex-col w-full">
            <label className="text-sm py-2 text-headline" htmlFor="image">
              Profile Image <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-start px-4 items-center">
              <label htmlFor="image" className="cursor-pointer">
                <img
                  className="w-[80px] h-[80px] rounded-full object-cover"
                  src={image ? URL.createObjectURL(image) : userInfo.user && userInfo.user.image ? userInfo.user.image : DefaultLogo}
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
              className="input border input-bordered w-full text-paragraph bg-background"
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
        <div className="shadow-xl rounded-md p-3 w-1/2 max-md:w-full flex flex-col">
          <form onSubmit={handleSubmitPassword}>
            <label className="text-sm py-2 text-headline" htmlFor="currentPassword">
              Current Password <span className="text-red-500">*</span>
            </label>
            <input
              className="input border input-bordered w-full text-paragraph bg-background"
              name="currentPassword"
              onChange={handleChangePassword}
              type="password"
              id="currentPassword"
            />

            <label className="text-sm py-2 text-headline" htmlFor="newPassword">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              className="input border input-bordered w-full text-paragraph bg-background"
              name="newPassword"
              onChange={handleChangePassword}
              type="password"
              id="newPassword"
            />

            <label className="text-sm py-2 text-headline" htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              className="input border input-bordered w-full text-paragraph bg-background"
              name="confirmPassword"
              onChange={handleChangePassword}
              type="password"
              id="confirmPassword"
            />
            <button
              className="bg-primary w-[150px] text-white mt-4 py-2 px-2 rounded-sm flex justify-center items-center gap-2"
              type="submit"
            >
              <span className="text-sm font-normal">Update Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
