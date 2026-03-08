import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import { defaultClothingItems } from "../../utils/clothingItems";
import { getItems, addItem, deleteItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import useWeather from "../../hooks/useWeather";

function App() {
  const user = {
    name: "Myke",
    avatar:
      "https://comicbook.com/wp-content/uploads/sites/4/2021/09/f07f8eed57dbf719fa539475e6e3f399.jpeg",
  };

  const weatherData = useWeather();

  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(() => {
        setClothingItems(defaultClothingItems);
      });
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function getItemId(item) {
    return item?._id ?? item?.id ?? null;
  }

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

  function handleAddItemSubmit(newItem, resetForm) {
    addItem(newItem)
      .then((item) => {
        setClothingItems((prevItems) => [item, ...prevItems]);
        resetForm();
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleDeleteRequest(card) {
    setSelectedCard(card);
    setActiveModal("confirm-delete");
  }

  function handleDeleteConfirm() {
    const selectedCardId = getItemId(selectedCard);
    if (!selectedCardId) return;

    const removeItemFromState = () => {
      setClothingItems((prevItems) =>
        prevItems.filter(
          (item) => String(getItemId(item)) !== String(selectedCardId),
        ),
      );
      handleCloseModal();
    };

    deleteItem(selectedCardId).then(removeItemFromState).catch(console.error);
  }

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          weatherData={weatherData}
          onAddClick={handleAddClick}
          user={user}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                onCardClick={handleCardClick}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                clothingItems={clothingItems}
                onCardClick={handleCardClick}
                onAddClick={handleAddClick}
              />
            }
          />
        </Routes>

        <Footer />

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
          onClose={handleCloseModal}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onDeleteClick={handleDeleteRequest}
          onClose={handleCloseModal}
        />

        <DeleteConfirmModal
          isOpen={activeModal === "confirm-delete"}
          onConfirm={handleDeleteConfirm}
          onClose={handleCloseModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
