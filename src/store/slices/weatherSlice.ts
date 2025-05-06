import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
  hourly: { time: string; temp: number }[];
  lat: number;
  lon: number;
}

interface WeatherState {
  cities: WeatherData[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  loading: false,
  error: null,
};

const saveCitiesToLocalStorage = (cities: WeatherData[]) => {
  localStorage.setItem("cities", JSON.stringify(cities));
};

const getCitiesFromLocalStorage = (): WeatherData[] => {
  const cities = localStorage.getItem("cities");
  return cities ? JSON.parse(cities) : [];
};

export const addCity = createAsyncThunk(
  "weather/addCity",
  async (city: string, { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      if (!API_KEY) {
        throw new Error("API key is missing");
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = response.data;
      const weatherData: WeatherData = {
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        hourly: [],
        lat: data.coord.lat,
        lon: data.coord.lon,
      };

      const storedCities = getCitiesFromLocalStorage();
      saveCitiesToLocalStorage([...storedCities, weatherData]);
      return weatherData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch weather data"
      );
    }
  }
);

export const loadCities = createAsyncThunk(
  "weather/loadCities",
  async (_, { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      if (!API_KEY) {
        throw new Error("API key is missing");
      }
      const storedCities = getCitiesFromLocalStorage();
      if (storedCities.length === 0) {
        return [];
      }
      const weatherPromises = storedCities.map((cityData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityData.city}&appid=${API_KEY}&units=metric`
        )
      );
      const responses = await Promise.all(weatherPromises);
      const weatherData = responses.map((response) => {
        const data = response.data;
        return {
          city: data.name,
          temperature: data.main.temp,
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          hourly: [],
          lat: data.coord.lat,
          lon: data.coord.lon,
        };
      });

      saveCitiesToLocalStorage(weatherData);
      return weatherData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load cities"
      );
    }
  }
);

export const deleteCity = createAsyncThunk(
  "weather/deleteCity",
  async (city: string, { rejectWithValue }) => {
    try {
      const storedCities = getCitiesFromLocalStorage();
      const updatedCities = storedCities.filter((c) => c.city !== city);
      saveCitiesToLocalStorage(updatedCities);
      return city;
    } catch (error: any) {
      return rejectWithValue("Failed to delete city");
    }
  }
);

export const updateWeather = createAsyncThunk(
  "weather/updateWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      if (!API_KEY) {
        throw new Error("API key is missing");
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = response.data;
      const weatherData: WeatherData = {
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        hourly: [],
        lat: data.coord.lat,
        lon: data.coord.lon,
      };

      const storedCities = getCitiesFromLocalStorage();
      const updatedCities = storedCities.map((c) =>
        c.city === city ? weatherData : c
      );
      saveCitiesToLocalStorage(updatedCities);
      return weatherData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update weather"
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities.push(action.payload);
      })
      .addCase(addCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(loadCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = state.cities.filter((c) => c.city !== action.payload);
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
