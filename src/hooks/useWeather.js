import { useEffect, useState } from "react";
import { getWeather } from "../utils/weatherApi";

const defaultWeatherData = {
  temperature: { F: 72, C: 22 },
  location: "New York, New York",
  type: "warm",
  timeOfDay: "day",
  weatherType: "sunny",
};

function useWeather(coordinates) {
  const [weatherData, setWeatherData] = useState(defaultWeatherData);

  useEffect(() => {
    if (!coordinates) return;
    getWeather(coordinates).then(setWeatherData).catch(console.error);
  }, [coordinates]);

  return weatherData;
}

export default useWeather;
