import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { ChartData } from 'chart.js';

ChartJS.register(...registerables);

interface BarChartProps {
  chartData: ChartData<'bar'>;
}

const BarChart = ({ chartData }: BarChartProps) => {

  const option = {}

  return <Bar data={chartData} options={option}/>; 
};

export default BarChart;
