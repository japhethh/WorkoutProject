import { useEffect, useState, useContext } from "react";
import axios from "axios";
import BarChart from '../ApexCharts/BarChart'
import { WorkoutContext } from "../context/WorkoutContext";
import { apiURL } from "../context/Store";
import DefaultLogo from '../assets/defaultLogo.png'



const Home = () => {

  const context = useContext(WorkoutContext)

  if (!context) {
    return null
  }

  const { token, userInfo } = context;



  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/user/getMonthlyAnalytics`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token for authentication
            },
          }
        );

        const data = response.data;

        // Map the response to chart-friendly format
        setCategories(data.map((item: any) => item.month));
        setSeries([
          {
            name: "Exercise Data",
            data: data.map((item: any) => item.exerciseDatas),
          },
        ]);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, [token]);

  return (
    <div className="oswald_jap md:w-4/6 w-6/6 mx-auto max-md:px-0 px-2 py-8 bg-background">
      <div className="flex justify-center my-4 px-2">
        <div className="stats lg:stats-horizontal shadow max-md:gap-5">

          <div className="stat">
            <div className="stat-title">New Users</div>
            <div className="stat-value">510</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img alt="Profile Avatart" src={userInfo?.user && userInfo?.user.image ? userInfo?.user?.image : DefaultLogo} />
                </div>
              </div>
            </div>
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
      </div>
      <BarChart categories={categories} series={series} />
    </div>
  );
};

export default Home;
