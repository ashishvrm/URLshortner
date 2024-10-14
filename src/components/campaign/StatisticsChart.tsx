import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface VisitorData {
  month: string;
  visitors: number;
}

interface StatisticsChartProps {
  statistics: VisitorData[];
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ statistics }) => {
  const chartData = {
    labels: statistics.map(item => item.month),
    datasets: [
      {
        label: 'Number of Visitors',
        data: statistics.map(item => item.visitors),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Visitor Trend Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Visitors',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default StatisticsChart;
