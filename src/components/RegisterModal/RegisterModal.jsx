import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import "./RegisterModal.css";

const INITIAL_FORM_VALUES = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

function isValidUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function RegisterModal({ isOpen, isLoading, onClose, onRegister, onLogInClick }) {
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
  const trimmedAvatar = values.avatar.trim();
  const trimmedEmail = values.email.trim().toLowerCase();
  const trimmedPassword = values.password;

  const isNameValid = trimmedName.length > 0;
  const isAvatarValid = isValidUrl(trimmedAvatar);
  const isEmailValid = isValidEmail(trimmedEmail);
  const isPasswordValid = trimmedPassword.length > 0;
  const isValid =
    isNameValid && isAvatarValid && isEmailValid && isPasswordValid;

  const nameError = isNameValid ? "" : "Please enter your name.";
  const avatarError = trimmedAvatar
    ? isAvatarValid
      ? ""
      : "Please enter a valid URL starting with http:// or https://."
    : "Please enter an avatar URL.";
  const emailError = isEmailValid
    ? ""
    : "Please enter a valid email address.";
  const passwordError = isPasswordValid ? "" : "Please enter a password.";

  const shouldShowNameError =
    (hasSubmitted || touched.name) && Boolean(nameError);
  const shouldShowAvatarError =
    (hasSubmitted || touched.avatar) && Boolean(avatarError);
  const shouldShowEmailError =
    (hasSubmitted || touched.email) && Boolean(emailError);
  const shouldShowPasswordError =
    (hasSubmitted || touched.password) && Boolean(passwordError);

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
    onRegister(
      {
        name: trimmedName,
        avatar: trimmedAvatar,
        email: trimmedEmail,
        password: trimmedPassword,
      },
      resetForm,
    );
  }

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      buttonText={isLoading ? "Signing Up..." : "Sign Up"}
      secondaryButtonText="or Log In"
      isOpen={isOpen}
      isSubmitDisabled={!isValid || isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      onSecondaryAction={onLogInClick}
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

      <label className="auth-modal__label">
        Email
        <input
          className={`auth-modal__input ${
            shouldShowEmailError ? "auth-modal__input_invalid" : ""
          }`}
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleFieldChange}
        />
        {shouldShowEmailError && (
          <span className="auth-modal__error">{emailError}</span>
        )}
      </label>

      <label className="auth-modal__label">
        Password
        <input
          className={`auth-modal__input ${
            shouldShowPasswordError ? "auth-modal__input_invalid" : ""
          }`}
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleFieldChange}
        />
        {shouldShowPasswordError && (
          <span className="auth-modal__error">{passwordError}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
