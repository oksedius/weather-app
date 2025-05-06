export interface City {
  name: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  city: string;
  temperature: string;
  condition: string;
  humidity: number;
  wind: number;
  lat: number;
  lon: number;
  hourly?: { time: string; temp: number }[];
}

export interface WeatherState {
  cities: WeatherData[];
  loading: boolean;
  error: string | null;
}
