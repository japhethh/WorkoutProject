import { create } from "zustand";
import axios from "axios";
export const apiURL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://backend-logistic1.jjm-manufacturing.com";

interface StoreState {
  exerciseData: any; // Replace `any` with the actual type of your exercise data
  loading: boolean;
  error: string | null;
  fetchExerciseData: () => Promise<void>;
  fetchExerciseBundle: () => Promise<void>
}

const Store = create<StoreState>((set) => ({
  exerciseData: null,
  loading: false,
  error: null,
  fetchExerciseData: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ error: "Token not found in localStorage", loading: false });
      return;
    }

    set({ loading: true, error: null }); // Start loading

    try {
      const response = await axios.get(`${apiURL}/api/user/exercise`);
      set({ exerciseData: response.data, loading: false }); // Update state with fetched data
    } catch (error: any) {
      console.error(error);
      set({
        error: error?.response?.data?.message || "Failed to fetch exercise data",
        loading: false,
      });
    }
  },
  fetchExerciseBundle: async () => {
    const token: string = localStorage.getItem("token");

    if (!token) {
      set({ error: "Token not found in localStorage", loading: false });
      return;
    }

    set({ loading: true, error: null }); // Start loading

    try {
      const response = await axios.get(`${apiURL}/api/user/bundle`, { headers: { Authorization: `Bearer ${token}` } })
      console.log(response?.data)
    } catch (error: any) {
      console.log(error?.response.data.message)
    }
  }
}));

export default Store;
