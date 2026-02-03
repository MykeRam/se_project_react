import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main() {
  // placeholder data (replace when you connect APIs/state)
  const items = [1, 2, 3];

  return (
    <main className="main">
      <WeatherCard />

      <section className="main__items">
        {items.map((id) => (
          <ItemCard key={id} />
        ))}
      </section>
    </main>
  );
}

export default Main;