import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./WeatherGraph.module.scss";
import type { WeatherData } from "../../types/weather";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherGraphProps {
  hourly: WeatherData["hourly"];
}

const WeatherGraph: React.FC<WeatherGraphProps> = ({ hourly }) => {
  const data = {
    labels: hourly?.map((h) => h.time) || [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: hourly?.map((h) => h.temp) || [],
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Hourly Temperature Forecast" },
    },
  };

  return (
    <div className={styles.weatherGraph}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherGraph;
