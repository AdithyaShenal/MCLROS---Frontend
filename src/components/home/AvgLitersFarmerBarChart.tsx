import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function AvgLitersFarmerBarChart() {
  const data = {
    labels: ["Farmer A", "Farmer B", "Farmer C", "Farmer D"],
    datasets: [
      {
        label: "Avg Liters",
        data: [120, 150, 90, 170],
        backgroundColor: "#0ea5e9", // sky blue
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="h-52">
      <Bar data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
}
