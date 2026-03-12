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

  const [userCoordinates, setUserCoordinates] = useState(null);
  const weatherData = useWeather(userCoordinates);
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      },
      { enableHighAccuracy: true, maximumAge: 0 },
    );
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(() => {
        setClothingItems(
          defaultClothingItems.map((item) => ({
            ...item,
            imageUrl: item.imageUrl ?? item.link,
          })),
        );
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
    setIsLoading(true);
    addItem(newItem)
      .then((item) => {
        setClothingItems((prevItems) => [item, ...prevItems]);
        resetForm();
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
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

    setIsLoading(true);
    deleteItem(selectedCardId)
      .then(removeItemFromState)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
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
          buttonText={isLoading ? "Adding..." : "Add garment"}
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
          buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
