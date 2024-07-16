import { createContext, ReactNode, FC, useEffect, useState, useReducer, Dispatch } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const WorkoutContext = createContext<WorkoutContextValue | null>(null);

interface WorkoutContextValue {
  apiURL: string;
  data: Data | null;
  setData: (value: Data) => void;
  getAll: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  getAllAnnouncement: () => Promise<void>; 
  formatTimeInPhilippines: (date: Date) => string; // Function signature
  token: string | null;
  setToken: (value: any | null) => void;
  userInfo: StateType;
  dispatch: Dispatch<ActionType>;
  clockTime:Date;
}

interface Props {
  children: ReactNode;
}

interface Item {
  name: string;
  set: number;
  rep: number;
  _id: string;
  focusArea: string;
}

interface Data {
  userName: string;
  image: string;
  email: string;
  exercises: Item[];
}

interface Announcement {
  head: string;
  body: string;
  footer: string;
  _id: string;
}

interface StateType {
  user: Data | null;
  announcement: Announcement[] | null;
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


const WorkoutContextProvider: FC<Props> = ({ children }) => {
  // const URL = "https://workout-project-api.vercel.app";
  //const URL = "http://localhost:4000";
  const apiURL = "https://workoutproject-api.onrender.com";
  const [userInfo, dispatch] = useReducer(reduce, { user: null, announcement: null });
  const [data, setData] = useState<Data | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [clockTime, setClockTime] = useState(new Date());

  useEffect(() => {
    if (token) {
      getAll();
      getAllAnnouncement();
      console.log(userInfo.announcement);

      const intervalValid = setInterval(() => {
        setClockTime(new Date);
      }, 1000);

      return () => clearInterval(intervalValid);
    }
  }, [token]);


 const formatTimeInPhilippines = (date: Date): string => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Manila',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    return date.toLocaleString('en-US', options);
  } catch (error) {
    console.error('Error formatting time:', error);
    return ''; // Handle error gracefully, return empty string or default value
  }
};



  const getAll = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/workout/get`, {
        headers: {
          token
        },
      });
      setData(response.data.data);
      dispatch({ type: "GET_USER", payload: response.data.data });
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (exerciseId: string) => {
    try {
      await axios.delete(`${apiURL}/api/workout/delete/exercise/${exerciseId}`, {
        headers: {
          token
        },
      });
      await getAll();
      toast.error("Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAnnouncement = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/admin/announcement/getAllAnnouncement`);

      dispatch({ type: "GET_ANNOUNCEMENT", payload: response.data.data })
      // console.log("hahhhdhafh")
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("FUCK YOUUUUUU!")
      }
    }
  }




  const contextValue: WorkoutContextValue = {
    apiURL,
    data,
    setData,
    getAll,
    handleDelete,
    getAllAnnouncement,
    token,
    setToken,
    userInfo,
    dispatch,
    clockTime,
    formatTimeInPhilippines
  };

  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContextProvider;
