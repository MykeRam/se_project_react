import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { defaultClothingItems } from "../../utils/clothingItems";
import { getItems, addItem, deleteItem } from "../../utils/api";
import {
  signup,
  signin,
  getUserData,
  updateUserData,
} from "../../utils/auth";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useWeather from "../../hooks/useWeather";

function App() {
  const [userCoordinates, setUserCoordinates] = useState(null);
  const weatherData = useWeather(userCoordinates);
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const isLoggedIn = Boolean(currentUser);

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

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsAuthChecked(true);
      return;
    }

    getUserData(token)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("jwt");
        setCurrentUser(null);
      })
      .finally(() => {
        setIsAuthChecked(true);
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

  function getItemOwnerId(item) {
    return item?.owner?._id ?? item?.owner?.id ?? item?.ownerId ?? item?.owner ?? null;
  }

  function isCurrentUserItem(item) {
    const currentUserId = currentUser?._id ?? currentUser?.id ?? null;

    if (!currentUserId) {
      return false;
    }

    return String(getItemOwnerId(item)) === String(currentUserId);
  }

  const currentUserItems = currentUser
    ? clothingItems.filter((item) => isCurrentUserItem(item))
    : [];

  function handleAddClick() {
    if (isLoggedIn) {
      setActiveModal("add-garment");
    }
  }

  function handleLoginClick() {
    setActiveModal("login");
  }

  function handleRegisterClick() {
    setActiveModal("register");
  }

  function handleEditProfileClick() {
    if (isLoggedIn) {
      setActiveModal("edit-profile");
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  function handleAuthSuccess(userData) {
    setCurrentUser(userData);
    handleCloseModal();
  }

  function handleAuthorize(credentials) {
    return signin(credentials).then((res) => {
      localStorage.setItem("jwt", res.token);
      return getUserData(res.token);
    });
  }

  function handleRegisterSubmit(values) {
    setIsAuthLoading(true);

    signup(values)
      .then(() =>
        handleAuthorize({ email: values.email, password: values.password }),
      )
      .then(handleAuthSuccess)
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }

  function handleLoginSubmit(values) {
    setIsAuthLoading(true);

    handleAuthorize(values)
      .then(handleAuthSuccess)
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }

  function handleUpdateProfileSubmit(values) {
    setIsAuthLoading(true);

    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    updateUserData(token, values)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    handleCloseModal();
  }

  function handleAddItemSubmit(newItem, resetForm) {
    setIsItemLoading(true);
    const token = localStorage.getItem("jwt");

    addItem(newItem, token)
      .then((item) => {
        setClothingItems((prevItems) => [item, ...prevItems]);
        resetForm();
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsItemLoading(false);
      });
  }

  function handleDeleteRequest(card) {
    setSelectedCard(card);
    setActiveModal("confirm-delete");
  }

  function handleDeleteConfirm() {
    const selectedCardId = getItemId(selectedCard);
    if (!selectedCardId) return;

    const token = localStorage.getItem("jwt");

    const removeItemFromState = () => {
      setClothingItems((prevItems) =>
        prevItems.filter(
          (item) => String(getItemId(item)) !== String(selectedCardId),
        ),
      );
      handleCloseModal();
    };

    setIsItemLoading(true);
    deleteItem(selectedCardId, token)
      .then(removeItemFromState)
      .catch(console.error)
      .finally(() => {
        setIsItemLoading(false);
      });
  }

  const canDeleteSelectedCard = Boolean(
    isLoggedIn && selectedCard && isCurrentUserItem(selectedCard),
  );

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            weatherData={weatherData}
            onAddClick={handleAddClick}
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
            isAuthChecked={isAuthChecked}
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
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isAuthChecked={isAuthChecked}
                >
                  <Profile
                    clothingItems={currentUserItems}
                    onCardClick={handleCardClick}
                    onAddClick={handleAddClick}
                    onEditProfileClick={handleEditProfileClick}
                    onLogout={handleLogout}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            isLoading={isItemLoading}
            onAddItem={handleAddItemSubmit}
            onClose={handleCloseModal}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            isLoading={isAuthLoading}
            onClose={handleCloseModal}
            onRegister={handleRegisterSubmit}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            isLoading={isAuthLoading}
            onClose={handleCloseModal}
            onLogin={handleLoginSubmit}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            isLoading={isAuthLoading}
            onClose={handleCloseModal}
            onUpdateProfile={handleUpdateProfileSubmit}
          />

          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            canDelete={canDeleteSelectedCard}
            onDeleteClick={handleDeleteRequest}
            onClose={handleCloseModal}
          />

          <DeleteConfirmModal
            isOpen={activeModal === "confirm-delete"}
            onConfirm={handleDeleteConfirm}
            onClose={handleCloseModal}
            buttonText={isItemLoading ? "Deleting..." : "Yes, delete item"}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
