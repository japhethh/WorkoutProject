import axios from "axios"
import { apiURL } from "./Store"
import { WorkoutContext } from "./WorkoutContext"
import { useContext } from "react"
import create from 'zustand '




const exampleZustand = create((set) => ({
  user: null,
  setUser:
}))


const totalUsers = async () => {
  const context = useContext(WorkoutContext)
  if (!context) {
    return null;
  }
  const response = await axios.get(`${apiURL}/api/user/totalUsers`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export { totalUsers }