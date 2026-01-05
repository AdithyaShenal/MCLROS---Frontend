import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function LitersLineChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Liters",
        data: [1200, 1400, 1100, 1600, 1500, 1700, 1800],
        borderColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  return (
    <div className="h-56">
      <Line data={data} />
    </div>
  );
}
