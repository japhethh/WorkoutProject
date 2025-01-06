import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

interface MyBarChartProps {
  categories: string[];
  series: { name: string; data: number[] }[];
}

const MyBarChart: React.FC<MyBarChartProps> = ({ categories, series }) => {
  const options: ApexOptions = {
    chart: {
      type: "bar", // Ensure this matches ApexOptions accepted types
      height: 350,
    },
    xaxis: {
      categories, // e.g., ['January', 'February', 'March']
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Monthly Data",
      align: "center",
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export { MyBarChart };
