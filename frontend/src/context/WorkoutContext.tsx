import { createContext, ReactNode, FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export const WorkoutContext = createContext<WorkoutContextValue | null>(null)

interface WorkoutContextValue {
  URL: string;
  data: Data | null;
  setData: (value: Data) => void;
  getAll: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>,
  token:string;
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
  exercises: Item[]
}



const WorkoutContextProvider: FC<Props> = ({ children }) => {
  const URL = "http://localhost:4000";
  const [data, setData] = useState<Data | null>(null);
  const [token, setToken] = useState<any>("")


  useEffect(() => {
    getAll();
    if(!localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
  }, [])


  const getAll = async () => {
    try {
      const response = await axios.get(`${URL}/api/workout/get`);
      setData(response.data.data);
   
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (exerciseId: string) => {
    const id = "667b2157c675054ab1f3fa5c";
    try {
      await axios.delete(`${URL}/api/workout/delete/${id}/exercise/${exerciseId}`);
      await getAll();
      toast.error("Deleted Successfully")
    } catch (err) {
      console.log(err)
    }
  }

  const contextValue: WorkoutContextValue = {
    URL,
    data,
    setData,
    getAll,
    handleDelete,
    token
  }


  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  )
}

export default WorkoutContextProvider