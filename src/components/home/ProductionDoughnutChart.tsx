import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export default function StatusDoughnutChart() {
  const data = {
    labels: ["Completed", "Failed"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["#3b82f6", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="h-56">
      <Doughnut data={data} />
    </div>
  );
}
