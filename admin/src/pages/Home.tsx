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
        {/* Stat Cards */}
        {/* ... */}
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
