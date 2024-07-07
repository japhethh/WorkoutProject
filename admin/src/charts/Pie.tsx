import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { ChartData } from 'chart.js';

ChartJS.register(...registerables);

interface BarChartProps {
  chartData: ChartData<'pie'>;
}

const BarChart = ({ chartData }: BarChartProps) => {
  const option = {}

  return <Pie data={chartData} options={option}/>; 
};

export default BarChart;
