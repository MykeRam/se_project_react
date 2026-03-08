import { useEffect, useState } from "react";
import { getWeather } from "../utils/weatherApi";

const defaultWeatherData = {
  temperature: { F: 72, C: 22 },
  location: "New York",
  type: "warm",
  timeOfDay: "day",
  weatherType: "sunny",
};

function useWeather() {
  const [weatherData, setWeatherData] = useState(defaultWeatherData);

  useEffect(() => {
    getWeather().then(setWeatherData).catch(console.error);
  }, []);

  return weatherData;
}

export default useWeather;
