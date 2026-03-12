import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import "./AddItemModal.css";

const INITIAL_FORM_VALUES = {
  name: "",
  imageUrl: "",
  weather: "",
};

const WEATHER_TYPES = ["hot", "warm", "cold"];

function isValidImageUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function AddItemModal({ isOpen, onAddItem, onClose, buttonText }) {
  const { values, handleChange, resetForm } = useForm(INITIAL_FORM_VALUES);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [touched, setTouched] = useState(INITIAL_FORM_VALUES);

  useEffect(() => {
    if (isOpen) {
      resetForm(INITIAL_FORM_VALUES);
      setHasSubmitted(false);
      setTouched(INITIAL_FORM_VALUES);
    }
  }, [isOpen, resetForm]);

  const trimmedName = values.name.trim();
  const trimmedImageUrl = values.imageUrl.trim();

  const isNameValid = trimmedName.length > 0;
  const isImageUrlValid = isValidImageUrl(trimmedImageUrl);
  const isWeatherValid = WEATHER_TYPES.includes(values.weather);
  const isValid = isNameValid && isImageUrlValid && isWeatherValid;

  const nameError = isNameValid ? "" : "Please enter a name.";
  const imageError = trimmedImageUrl
    ? isImageUrlValid
      ? ""
      : "Please enter a valid URL starting with http:// or https://."
    : "Please enter an image URL.";
  const weatherError = isWeatherValid ? "" : "Please select a weather type.";
  const shouldShowNameError = (hasSubmitted || touched.name) && Boolean(nameError);
  const shouldShowImageError =
    (hasSubmitted || touched.imageUrl) && Boolean(imageError);
  const shouldShowWeatherError =
    (hasSubmitted || touched.weather) && Boolean(weatherError);

  function handleFieldChange(event) {
    const { name } = event.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    handleChange(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setHasSubmitted(true);
    if (!isValid) return;
    setHasSubmitted(false);
    onAddItem(
      { ...values, name: trimmedName, imageUrl: trimmedImageUrl },
      resetForm,
    );
  }

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="add-item__label">
        Name
        <input
          className={`add-item__input ${
            shouldShowNameError ? "add-item__input_invalid" : ""
          }`}
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleFieldChange}
        />
        {shouldShowNameError && (
          <span className="add-item__error">{nameError}</span>
        )}
      </label>

      <label className="add-item__label">
        Image
        <input
          className={`add-item__input ${
            shouldShowImageError ? "add-item__input_invalid" : ""
          }`}
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleFieldChange}
        />
        {shouldShowImageError && (
          <span className="add-item__error">{imageError}</span>
        )}
      </label>

      <fieldset className="add-item__fieldset">
        <legend className="add-item__legend">Select the weather type:</legend>

        <label className="add-item__radio-label">
          <input
            className="add-item__radio"
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleFieldChange}
          />
          Hot
        </label>

        <label className="add-item__radio-label">
          <input
            className="add-item__radio"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleFieldChange}
          />
          Warm
        </label>

        <label className="add-item__radio-label">
          <input
            className="add-item__radio"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleFieldChange}
          />
          Cold
        </label>

        {shouldShowWeatherError && (
          <span className="add-item__error">{weatherError}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
