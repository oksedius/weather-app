import type { City } from "../types/weather";

export const saveCitiesToLocalStorage = (cities: City[]) => {
  localStorage.setItem("cities", JSON.stringify(cities));
};

export const getCitiesFromLocalStorage = (): City[] => {
  const cities = localStorage.getItem("cities");
  return cities ? JSON.parse(cities) : [];
};
