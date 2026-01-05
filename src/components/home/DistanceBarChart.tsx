import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function DistanceBarChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Distance (km)",
        data: [120, 150, 110, 180, 160, 190, 200],
        backgroundColor: "#10b981",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="h-56">
      <Bar data={data} />
    </div>
  );
}
