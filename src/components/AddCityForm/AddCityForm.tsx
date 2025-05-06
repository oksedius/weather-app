import styles from "./AddCityForm.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addCity } from "../../store/slices/weatherSlice";
import { TextField, Button } from "@mui/material";

const AddCityForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.weather.loading);
  const error = useAppSelector((state) => state.weather.error);
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() === "") return;
    dispatch(addCity(city));
    setCity("");
  };

  return (
    <form className={styles.addCityForm} onSubmit={handleSubmit}>
      <TextField
        label="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        variant="outlined"
        size="small"
        disabled={loading}
      />
      <Button type="submit" variant="contained" disabled={loading}>
        Add City
      </Button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default AddCityForm;
