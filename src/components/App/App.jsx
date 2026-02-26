import { useEffect, useState } from "react";
import { getWeather } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    temperature: 72,
    location: "New York",
    type: "warm",
    timeOfDay: "day",
    weatherType: "sunny",
  });

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  const [activeModal, setActiveModal] = useState("");
  const [clothingItems] = useState(defaultClothingItems);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleAddClick() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  return (
    <div className="app">
      <Header
        weatherData={weatherData}
        onAddClick={handleAddClick}
        user={{
          name: "Myke",
          avatar:
            "https://comicbook.com/wp-content/uploads/sites/4/2021/09/f07f8eed57dbf719fa539475e6e3f399.jpeg",
        }}
      />

      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
      />

      <Footer />

      <AddItemModal isOpen={activeModal === "add-garment"} onClose={handleCloseModal} />

      <ItemModal
        isOpen={activeModal === "preview"}
        card={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;