import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, onCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type,
  );
  const itemsGapClass =
    filteredItems.length > 4 ? "main__items_gap_85" : "main__items_gap_171";

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="main__section">
        <h2 className="main__title">
          Today is {weatherData.temperature[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </h2>
        <ul className={`main__items ${itemsGapClass}`}>
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
