import { createContext, ReactNode, FC, useEffect, useState, useReducer, Dispatch } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const WorkoutAdminContext = createContext<WorkoutContextValue | null>(null);

interface WorkoutContextValue {
  apiURL: string;
  data: Data | null;
  setData: (value: Data) => void;
  getAllUser: () => Promise<void>;
  // handleDelete: (id: string) => Promise<void>;
  token: string | null;
  setToken: (value: any | null) => void;
  userInfo: StateType;
  dispatch: Dispatch<ActionType>;
  handleDeleteUser: (userId: string) => Promise<void>
  getAllAnnouncement: () => Promise<void>
}

interface Props {
  children: ReactNode;
}



interface Item {
  name: string;
  set: number;
  rep: number;
  _id: string;
}

interface Data {
  userName: string;
  image: string;
  email: string;
  exercises: Item[];
}



interface StateType {
  user: Data;
  announcement: any;
}

interface ActionType {
  type: "GET_USER" | "GET_ANNOUNCEMENT",
  payload: any;
}

const reduce = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      }
    case "GET_ANNOUNCEMENT":
      return {
        ...state,
        announcement: action.payload,
      }
    default:
      return state;
  }
}

const WorkoutAdminContextProvider: FC<Props> = ({ children }) => {
  // const apiURL = "https://workout-project-api.vercel.app";
  // const apiURL = "http://localhost:4000";
  const apiURL = "https://workoutproject-api.onrender.com";

  const [userInfo, dispatch] = useReducer(reduce, { user: null, announcement: null });
  const [data, setData] = useState<Data | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    console.log(userInfo)
    getAllUser();
    getAllAnnouncement();
  }, []);


  const getAllUser = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/admin/getAllUser`);
      console.log("API Response:", response);
      if (response.data.success) {
        setData(response.data.data);
        dispatch({ type: "GET_USER", payload: response.data.data });
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        console.error("API Error:", error.response.data.message);
      } else {
        toast.error("An error occurred during login. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  const handleDeleteUser = async (userId: string): Promise<void> => {
    try {
      const response = await axios.post(`${apiURL}/api/admin/delete`, { userId });
      if (response.data.success) {
        getAllUser();
        toast.success("Deleted Successfully")
      }

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.error("FUCK WHY IS THIS NOT WORKING!!!");
      }

    }
  }

  const getAllAnnouncement = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/admin/announcement/getAllAnnouncement`);
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch({ type: "GET_ANNOUNCEMENT", payload: response.data.data });
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  }






  

  // const getAll = async () => {
  //   try {
  //     const response = await axios.get(`${apiURL}/api/workout/get`, {
  //       headers: {
  //        token
  //       },
  //     });
  //     setData(response.data.data);
  //     dispatch({type:"GET_USER",payload:response.data.data});
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };






  // const handleDelete = async (exerciseId: string) => {
  //   try {
  //     await axios.delete(`${apiURL}/api/workout/delete/exercise/${exerciseId}`, {
  //       headers: {
  //         token
  //       },
  //     });
  //     await getAll();
  //     toast.error("Deleted Successfully");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const contextValue: WorkoutContextValue = {
    apiURL,
    data,
    setData,
    getAllUser,
    // handleDelete,
    handleDeleteUser,
    token,
    setToken,
    userInfo,
    dispatch,
    getAllAnnouncement
  };

  return (
    <WorkoutAdminContext.Provider value={contextValue}>
      {children}
    </WorkoutAdminContext.Provider>
  );
};

export default WorkoutAdminContextProvider;
