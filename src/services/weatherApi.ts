import axios from "axios";
import type { WeatherData, City } from "../types/weather";
import { GEOCODING_URL, WEATHER_URL, API_KEY } from "../utils/constants";

export const fetchCoordinates = async (city: string): Promise<City> => {
  const response = await axios.get(GEOCODING_URL, {
    params: { q: city, limit: 1, appid: API_KEY },
  });
  const data = response.data[0];
  return { name: data.name, lat: data.lat, lon: data.lon };
};

export const fetchWeather = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  const response = await axios.get(WEATHER_URL, {
    params: { lat, lon, units: "metric", appid: API_KEY },
  });
  const data = response.data;
  return {
    city: data.timezone.split("/")[1] || "Unknown",
    temperature: `${Math.round(data.current.temp)}°C`,
    condition: data.current.weather[0].description,
    humidity: data.current.humidity,
    wind: data.current.wind_speed,
    lat,
    lon,
    hourly: data.hourly.slice(0, 24).map((hour: any) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: Math.round(hour.temp),
    })),
  };
};
