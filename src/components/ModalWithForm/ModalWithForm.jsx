import "./ModalWithForm.css";
import useModalClose from "../../hooks/useModalClose";

function ModalWithForm({
  name,
  title,
  buttonText,
  secondaryButtonText,
  isOpen,
  isSubmitDisabled = false,
  onClose,
  onSubmit,
  onSecondaryAction,
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

          <div className="modal__actions">
            <button
              className="modal__submit"
              type="submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>

            {secondaryButtonText ? (
              <button
                className="modal__secondary-button"
                type="button"
                onClick={onSecondaryAction}
              >
                {secondaryButtonText}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
