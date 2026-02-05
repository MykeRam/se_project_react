function ItemModal({ isOpen, card, onClose }) {
  if (!card) return null;

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains("modal")) {
      onClose();
    }
  }

  return (
    <div
      className={`modal modal_type_preview ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__caption">
          <p className="modal__title">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;