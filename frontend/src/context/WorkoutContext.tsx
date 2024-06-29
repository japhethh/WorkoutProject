import { createContext, ReactNode, FC, useEffect, useState, useReducer, Dispatch } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const WorkoutContext = createContext<WorkoutContextValue | null>(null);

interface WorkoutContextValue {
  URL: string;
  data: Data | null;
  setData: (value: Data) => void;
  getAll: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  token: string | null;
  setToken: (value: any | null) => void;
  userInfo: StateType;
  dispatch: Dispatch<ActionType>
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
  exercises: Item[];
}

interface StateType {
  user: any;

}

interface ActionType {
  type: "GET_USER",
  payload: any;
}



const reduce = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state;
  }
}

const WorkoutContextProvider: FC<Props> = ({ children }) => {
  const URL = "https://workout-project-api.vercel.app";
  

  // const URL = "http://localhost:3000";
  const [userInfo, dispatch] = useReducer(reduce, { user: null });
  const [data, setData] = useState<Data | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      getAll();
    }
  }, [token]);

  const getAll = async () => {
    try {
      const response = await axios.get(`${URL}/api/workout/get`, {
        headers:
          { token },

      });
      setData(response.data.data);
      dispatch({type:"GET_USER",payload:response.data.data})
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (exerciseId: string) => {

    try {
      await axios.delete(`${URL}/api/workout/delete/exercise/${exerciseId}`, {
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

  const contextValue: WorkoutContextValue = {
    URL,
    data,
    setData,
    getAll,
    handleDelete,
    token,
    setToken,
    userInfo,
    dispatch
  };

  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContextProvider;
