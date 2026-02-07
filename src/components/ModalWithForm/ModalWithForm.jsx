import "./ModalWithForm.css";
import { useEffect } from "react";

function ModalWithForm({ name, title, buttonText, isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  function handleOverlayClick(evt) {
    // close only if clicking the overlay itself (the modal container)
    if (evt.target.classList.contains("modal")) {
      onClose();
    }
  }

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" name={name}>
          {children}

          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
