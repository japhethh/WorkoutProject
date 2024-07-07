import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { ChartData } from 'chart.js';


ChartJS.register(...registerables);

interface LineChartProps {
  chartData: ChartData<'line'>;
}


const LineChart = ({ chartData }: LineChartProps) => {
  return (
    <Line data={chartData} />)
}

export default LineChart