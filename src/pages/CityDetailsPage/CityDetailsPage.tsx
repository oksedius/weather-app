import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import WeatherGraph from "../../components/WeatherGraph/WeatherGraph";
import { Button } from "@mui/material";
import styles from "./CityDetailsPage.module.scss";

const CityDetailsPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const cityData = useAppSelector((state) =>
    state.weather.cities.find((c) => c.city === city)
  );

  if (!cityData) {
    return <div>City not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cityDetails}>
        <h2>{city} - Detailed Weather</h2>
        <p>Temperature: {cityData.temperature}</p>
        <p>Condition: {cityData.condition}</p>
        <p>Humidity: {cityData.humidity}%</p>
        <p>Wind: {cityData.wind} m/s</p>
        {cityData.hourly && <WeatherGraph hourly={cityData.hourly} />}
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default CityDetailsPage;
