import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";
import useModalClose from "../../hooks/useModalClose";

function ItemModal({ isOpen, card, onDeleteClick, onClose }) {
  useModalClose(isOpen, onClose);
  const currentUser = useContext(CurrentUserContext);

  if (!card) return null;

  const currentUserId = currentUser?._id ?? currentUser?.id ?? null;
  const ownerId =
    card?.owner?._id ?? card?.owner?.id ?? card?.ownerId ?? card?.owner ?? null;
  const isOwn =
    Boolean(currentUserId) &&
    Boolean(ownerId) &&
    String(currentUserId) === String(ownerId);

  return (
    <div
      className={`modal modal_type_preview ${isOpen ? "modal_is-opened" : ""}`}
    >
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__caption">
          <div className="modal__caption-row">
            <p className="modal__title">{card.name}</p>
            {isOwn ? (
              <button
                className="modal__delete-button"
                type="button"
                onClick={() => onDeleteClick(card)}
              >
                Delete item
              </button>
            ) : null}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
