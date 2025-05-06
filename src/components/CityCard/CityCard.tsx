import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateWeather, deleteCity } from "../../store/slices/weatherSlice";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./CityCard.module.scss";
import type { WeatherData } from "../../types/weather";

const CityCard: React.FC<WeatherData> = ({ city, temperature, condition }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.weather.loading);

  const handleUpdate = () => {
    dispatch(updateWeather(city));
  };

  const handleDelete = () => {
    dispatch(deleteCity(city));
  };

  return (
    <div className={styles.cityCard}>
      <Link to={`/city/${city}`} className={styles.link}>
        <h3>{city}</h3>
        <div className={styles.weatherIcon}></div>
        <p>{`${temperature}, ${condition}`}</p>
      </Link>
      <div className={styles.buttons}>
        <Button onClick={handleUpdate} disabled={loading} variant="contained">
          Update Weather
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CityCard;
