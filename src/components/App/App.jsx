import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";

function App() {
  // hardcoded for now (replace with real data later)
  const [weatherData] = useState({
    temperature: 72,
    location: "New York",
    type: "warm", // example: "hot" | "warm" | "cold"
  });

  const [activeModal, setActiveModal] = useState("");

  const [clothingItems] = useState(defaultClothingItems);

  function handleAddClick() {
  setActiveModal("add-garment");
}

function handleCloseModal() {
  setActiveModal("");
}

  return (
    <div className="app">
      <Header
        weatherData={weatherData}
        onAddClick={handleAddClick}
        user={{ name: "Myke", avatar: "https://via.placeholder.com/40" }}
      />

      <Main weatherData={weatherData} clothingItems={clothingItems} />

      <Footer />

      <ModalWithForm
  name="add-garment"
  title="New garment"
  buttonText="Add garment"
  isOpen={activeModal === "add-garment"}
  onClose={handleCloseModal}
/>
    </div>
  );
}

export default App;
