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

export default function ProductionsLineChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Productions",
        data: [20, 25, 18, 30, 28, 35, 40],
        borderColor: "#6366f1", // indigo
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  return (
    <div className="h-52">
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
}
