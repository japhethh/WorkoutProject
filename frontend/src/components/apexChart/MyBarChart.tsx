import Chart from "react-apexcharts";

interface interfaceSeries {
  name: string;
  data: any[]
}

interface myChart {
  categories: string[],
  series: interfaceSeries[]
}



const MyBarChart = ({ categories, series }: myChart) => {
  const options = {
    chart: {
      type: "bar",
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
