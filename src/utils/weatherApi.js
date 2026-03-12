import { apiKey } from "./constants";
import { checkResponse } from "./api";

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

function getLocationState({ latitude, longitude }) {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`,
  )
    .then(checkResponse)
    .then((locations) => locations?.[0]?.state ?? "")
    .catch(() => "");
}

function normalizeArea(area = "") {
  return area.replace(/\s+County$/i, "").trim();
}

function getBroadLocation({ latitude, longitude }, fallbackLocation, fallbackState) {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&zoom=10&addressdetails=1`,
    {
      headers: {
        "Accept-Language": "en",
      },
    },
  )
    .then(checkResponse)
    .then((data) => {
      const address = data?.address ?? {};
      const broadArea = normalizeArea(
        address.borough ??
          address.city_district ??
          address.county ??
          address.city ??
          address.town ??
          address.village ??
          "",
      );
      const state = address.state ?? fallbackState;

      if (broadArea && state) return `${broadArea}, ${state}`;
      if (broadArea) return broadArea;
      if (fallbackState) return `${fallbackLocation}, ${fallbackState}`;
      return fallbackLocation;
    })
    .catch(() =>
      fallbackState ? `${fallbackLocation}, ${fallbackState}` : fallbackLocation,
    );
}

function filterWeatherData(data, location = data.name) {
  const tempF = Math.round(data.main.temp);
  const temperature = {
    F: tempF,
    C: Math.round((tempF - 32) * (5 / 9)),
  };
  const type = getWeatherCondition(tempF);

  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const timeOfDay = getTimeOfDay(sunrise, sunset);

  const weatherMain = data.weather[0].main;
  const weatherType = getWeatherType(weatherMain);

  return { temperature, location, type, timeOfDay, weatherType };
}

function getWeather(coordinates) {
  const { latitude, longitude } = coordinates;

  const weatherRequest = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then(checkResponse);

  const stateRequest = getLocationState(coordinates);

  return Promise.all([weatherRequest, stateRequest]).then(
    ([weatherData, state]) =>
      getBroadLocation(coordinates, weatherData.name, state).then((location) =>
        filterWeatherData(weatherData, location),
      ),
  );
}

export { getWeather, getWeatherCondition, getTimeOfDay, getWeatherType };
