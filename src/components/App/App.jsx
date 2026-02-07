import { useEffect, useState } from "react";
import { getWeather } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";


function App() {
  const [weatherData, setWeatherData] = useState({
    temperature: 72,
    location: "New York",
    type: "warm", // example: "hot" | "warm" | "cold"
  });

  useEffect(() => {
    getWeather().then((data) => {
      setWeatherData(data);
    });
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
        user={{ name: "Myke", avatar: "https://via.placeholder.com/40" }}
      />

      <Main
  weatherData={weatherData}
  clothingItems={clothingItems}
  onCardClick={handleCardClick}
/>

      <Footer />

      <ModalWithForm
  name="add-garment"
  title="New garment"
  buttonText="Add garment"
  isOpen={activeModal === "add-garment"}
  onClose={handleCloseModal}
/>

      <ItemModal
        isOpen={activeModal === "preview"}
        card={selectedCard}
        onClose={handleCloseModal}
      />

    </div>
  );
}

export default App;
