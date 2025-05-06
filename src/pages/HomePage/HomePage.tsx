import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { loadCities } from "../../store/slices/weatherSlice";
import Header from "../../components/Header/Header";
import AddCityForm from "../../components/AddCityForm/AddCityForm";
import CityCard from "../../components/CityCard/CityCard";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.weather.cities);

  useEffect(() => {
    dispatch(loadCities());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header />
      <AddCityForm />
      <div className={styles.cityList}>
        {cities.map((city) => (
          <CityCard
            key={city.city}
            city={city.city}
            temperature={`${city.temperature}°C`}
            condition={city.condition}
            lat={city.lat}
            lon={city.lon}
            humidity={city.humidity}
            wind={city.wind}
            hourly={city.hourly}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
