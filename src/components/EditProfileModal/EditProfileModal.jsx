import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm";
import "./EditProfileModal.css";

const INITIAL_FORM_VALUES = {
  name: "",
  avatar: "",
};

function isValidUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function EditProfileModal({
  isOpen,
  isLoading,
  onClose,
  onUpdateProfile,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm } = useForm(INITIAL_FORM_VALUES);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [touched, setTouched] = useState(INITIAL_FORM_VALUES);

  useEffect(() => {
    if (isOpen) {
      resetForm({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
      setHasSubmitted(false);
      setTouched(INITIAL_FORM_VALUES);
    }
  }, [currentUser?.avatar, currentUser?.name, isOpen, resetForm]);

  const trimmedName = values.name.trim();
  const trimmedAvatar = values.avatar.trim();

  const isNameValid = trimmedName.length > 0;
  const isAvatarValid = isValidUrl(trimmedAvatar);
  const isValid = isNameValid && isAvatarValid;

  const nameError = isNameValid ? "" : "Please enter your name.";
  const avatarError = trimmedAvatar
    ? isAvatarValid
      ? ""
      : "Please enter a valid URL starting with http:// or https://."
    : "Please enter an avatar URL.";

  const shouldShowNameError =
    (hasSubmitted || touched.name) && Boolean(nameError);
  const shouldShowAvatarError =
    (hasSubmitted || touched.avatar) && Boolean(avatarError);

  function handleFieldChange(event) {
    const { name } = event.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    handleChange(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setHasSubmitted(true);

    if (!isValid) {
      return;
    }

    setHasSubmitted(false);
    onUpdateProfile(
      {
        name: trimmedName,
        avatar: trimmedAvatar,
      },
      resetForm,
    );
  }

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      isOpen={isOpen}
      isSubmitDisabled={!isValid || isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="auth-modal__label">
        Name
        <input
          className={`auth-modal__input ${
            shouldShowNameError ? "auth-modal__input_invalid" : ""
          }`}
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleFieldChange}
        />
        {shouldShowNameError && (
          <span className="auth-modal__error">{nameError}</span>
        )}
      </label>

      <label className="auth-modal__label">
        Avatar URL
        <input
          className={`auth-modal__input ${
            shouldShowAvatarError ? "auth-modal__input_invalid" : ""
          }`}
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleFieldChange}
        />
        {shouldShowAvatarError && (
          <span className="auth-modal__error">{avatarError}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
