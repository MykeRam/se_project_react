import "./ModalWithForm.css";
import useModalClose from "../../hooks/useModalClose";

function ModalWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  useModalClose(isOpen, onClose);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
    >
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" name={name} onSubmit={onSubmit} noValidate>
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
