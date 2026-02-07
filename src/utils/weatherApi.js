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

function filterWeatherData(data) {
  const temperature = Math.round(data.main.temp);
  const location = data.name;
  const type = getWeatherCondition(temperature);

  return { temperature, location, type };
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

export { getWeather, getWeatherCondition };