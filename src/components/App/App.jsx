import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  // hardcoded for now (replace with real data later)
  const [weatherData] = useState({
    temperature: 72,
    location: "New York",
    type: "warm", // example: "hot" | "warm" | "cold"
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const clothingItems = [
    { _id: 1, name: "Jacket", weather: "cold" },
    { _id: 2, name: "Hoodie", weather: "warm" },
    { _id: 3, name: "T-Shirt", weather: "hot" },
  ];

  function handleAddClick() {
    setIsAddModalOpen(true);
  }

  function handleCloseModals() {
    setIsAddModalOpen(false);
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

      <ModalWithForm isOpen={isAddModalOpen} onClose={handleCloseModals} />
      <ItemModal />
    </div>
  );
}

export default App;
export { defaultClothingItems };