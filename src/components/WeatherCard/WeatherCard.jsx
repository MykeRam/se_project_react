import "./WeatherCard.css";

import daySunny from "../../images/day-sunny.png";
import dayCloudy from "../../images/day-cloudy.png";
import dayRain from "../../images/day-rain.png";
import dayStorm from "../../images/day-storm.png";
import daySnow from "../../images/day-snow.png";
import dayFog from "../../images/day-fog.png";

import nightSunny from "../../images/night-sunny.png";
import nightCloudy from "../../images/night-cloudy.png";
import nightRain from "../../images/night-rain.png";
import nightStorm from "../../images/night-storm.png";
import nightSnow from "../../images/night-snow.png";
import nightFog from "../../images/night-fog.png";

const weatherImages = {
  day: {
    sunny: daySunny,
    cloudy: dayCloudy,
    rain: dayRain,
    storm: dayStorm,
    snow: daySnow,
    fog: dayFog,
  },
  night: {
    sunny: nightSunny,
    cloudy: nightCloudy,
    rain: nightRain,
    storm: nightStorm,
    snow: nightSnow,
    fog: nightFog,
  },
};

function WeatherCard({ weatherData }) {
  const timeOfDay = weatherData.timeOfDay || "day";
  const weatherType = weatherData.weatherType || "sunny";

  const bgImage =
    weatherImages?.[timeOfDay]?.[weatherType] || weatherImages.day.sunny;

  return (
    <section
      className="weather-card"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <p className="weather-card__temp">{weatherData.temperature}°</p>
    </section>
  );
}

export default WeatherCard;