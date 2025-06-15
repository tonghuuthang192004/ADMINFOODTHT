import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line, Bar } from 'react-chartjs-2';

// Đăng ký các thành phần cần thiết cho ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  datasets: [
    {
      label: "Dữ liệu đầu tiên",
      backgroundColor: "rgba(255, 213, 59, 0.7)",
      borderColor: "rgb(255, 212, 59)",
      pointBackgroundColor: "rgb(255, 212, 59)",
      pointBorderColor: "rgb(255, 212, 59)",
      data: [20, 59, 90, 51, 56, 100],
      fill: true,
    },
    {
      label: "Dữ liệu kế tiếp",
      backgroundColor: "rgba(9, 109, 239, 0.65)",
      borderColor: "rgb(9, 109, 239)",
      pointBackgroundColor: "rgb(9, 109, 239)",
      pointBorderColor: "rgb(9, 109, 239)",
      data: [48, 48, 49, 39, 86, 10],
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

export function LineChart() {
  return <Line data={data} options={options} />;
}

export function BarChart() {
  return <Bar data={data} options={options} />;
}
