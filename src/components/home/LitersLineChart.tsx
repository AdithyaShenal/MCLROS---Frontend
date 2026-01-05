import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
export default function LitersLineChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Total Liters",
        data: [1200, 1400, 1100, 1600, 1500, 1700, 1800],
        borderColor: "#3b82f6", // blue
        backgroundColor: "#3b82f6",
      },
    ],
  };
  return <Line data={data} />;
}
