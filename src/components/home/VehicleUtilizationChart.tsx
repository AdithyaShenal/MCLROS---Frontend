import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export default function VehicleUtilizationChart() {
  const data = {
    labels: ["In Use", "Idle"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#22c55e", "#f97316"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="h-52 flex items-center justify-center">
      <Doughnut data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
}
