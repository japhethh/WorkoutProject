import axios from 'axios';
import { create } from 'zustand';

export const apiURL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://backend-logistic1.jjm-manufacturing.com";

const Store = create((set) => ({
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
      const response = await axios.get(`${apiURL}/api/user/exercise`
      );

      set({ exerciseData: response.data, loading: false }); // Update state with fetched data
    } catch (error) {
      console.error(error);
      set({
        error: error?.response?.data?.message || "Failed to fetch exercise data",
        loading: false,
      });
    }
  },
}));

export default Store;
