import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("hot");

  const isValid = name.trim() && imageUrl.trim() && weather;

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) return;

    onClose();

    setName("");
    setImageUrl("");
    setWeather("hot");
  }

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="add-item__label">
        Name
        <input
          className="add-item__input"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

      <label className="add-item__label">
        Image
        <input
          className="add-item__input"
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          required
        />
      </label>

      <fieldset className="add-item__fieldset">
        <legend className="add-item__legend">Select the weather type:</legend>

        <label className="add-item__radio-label">
          <input
            className="add-item__radio"
            type="radio"
            name="weather"
            value="hot"
            checked={weather === "hot"}
            onChange={(event) => setWeather(event.target.value)}
          />
          Hot
        </label>

        <label className="add-item__radio-label">
          <input
            className="add-item__radio"
            type="radio"
            name="weather"
            value="warm"
            checked={weather === "warm"}
            onChange={(event) => setWeather(event.target.value)}
          />
          Warm
        </label>

        <label className="add-item__radio-label">
          <input
            className="add-item__radio"
            type="radio"
            name="weather"
            value="cold"
            checked={weather === "cold"}
            onChange={(event) => setWeather(event.target.value)}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;