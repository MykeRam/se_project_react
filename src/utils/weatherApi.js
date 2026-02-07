import { apiKey, coordinates } from "./constants";

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Error ${res.status}`);
}

function getWeatherCondition(tempF) {
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}

function getTimeOfDay(sunrise, sunset) {
  const now = Date.now() / 1000; // ms → seconds
  return now >= sunrise && now < sunset ? "day" : "night";
}

function getWeatherType(weatherMain) {
  if (weatherMain === "Clear") return "sunny";
  if (weatherMain === "Clouds") return "cloudy";
  if (weatherMain === "Rain") return "rain";
  if (weatherMain === "Snow") return "snow";
  return "fog";
}

function filterWeatherData(data) {
  const temperature = Math.round(data.main.temp);
  const location = data.name;
  const type = getWeatherCondition(temperature);


  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const timeOfDay = getTimeOfDay(sunrise, sunset);

  const weatherMain = data.weather[0].main;
  const weatherType = getWeatherType(weatherMain);

  return { temperature, location, type, timeOfDay, weatherType };
}

function getWeather() {
  const { latitude, longitude } = coordinates;
  console.log("USING API KEY:", apiKey);

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  )
    .then(checkResponse)
    .then(filterWeatherData);
}

export { getWeather, getWeatherCondition, getTimeOfDay,
  getWeatherType, };