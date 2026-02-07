import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { temperature, timeOfDay, weatherType } = weatherData;

  const weatherCardClassName = `weather-card weather-card_${timeOfDay} weather-card_${weatherType}`;

  return (
    <section className={weatherCardClassName}>
      <p className="weather-card__temp">{temperature}°F</p>
    </section>
  );
}

export default WeatherCard;
