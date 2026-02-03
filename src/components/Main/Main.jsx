import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({ weatherData, clothingItems }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="main__section">
        <ul className="main__items">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;