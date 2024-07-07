import { useState, useEffect } from 'react';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import Pie from '../charts/Pie';
import { UserData } from '../context/index';

interface Data {
  labels: number[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

const Home = () => {
  const [userData, setUserData] = useState<Data>({
    labels: [],
    datasets: [{
      label: "Users Gained",
      data: [],
      backgroundColor: [
        "#FFF9D0",
        "#CAF4FF",
        "#A0DEFF",
        "#5AB2FF",
      ],
    }]
  });

  useEffect(() => {
    // Initialize userData based on UserData context
    setUserData({
      labels: UserData.map(data => data.year),
      datasets: [{
        label: "Users Gained",
        data: UserData.map(data => data.userGain),
        backgroundColor: [
          "#FFF9D0",
          "#CAF4FF",
          "#A0DEFF",
          "#5AB2FF",
        ],
      }]
    });
  }, [UserData]); // Update userData whenever UserData context changes

  return (
    <div className="flex flex-col justify-center py-4 px-2">
      <div className="stats w-full shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="stat-title">Downloads</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <div className="stat-title">New Users</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-wrap">
        <div className="w-[480px] h-96">
          <BarChart chartData={userData} />
        </div>
        <div className="w-[480px] h-96">
          <LineChart chartData={userData} />
        </div>
        <div className="w-[480px] h-96">
          <Pie chartData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
