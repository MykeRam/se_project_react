import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import "./LoginModal.css";

const INITIAL_FORM_VALUES = {
  email: "",
  password: "",
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function LoginModal({ isOpen, isLoading, onClose, onLogin, onSignUpClick }) {
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

  const trimmedEmail = values.email.trim().toLowerCase();
  const trimmedPassword = values.password;

  const isEmailValid = isValidEmail(trimmedEmail);
  const isPasswordValid = trimmedPassword.length > 0;
  const isValid = isEmailValid && isPasswordValid;

  const emailError = isEmailValid
    ? ""
    : "Please enter a valid email address.";
  const passwordError = isPasswordValid ? "" : "Please enter a password.";

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
    onLogin(
      {
        email: trimmedEmail,
        password: trimmedPassword,
      },
      resetForm,
    );
  }

  return (
    <ModalWithForm
      name="login"
      title="Log In"
      buttonText={isLoading ? "Logging In..." : "Log In"}
      secondaryButtonText="or Sign Up"
      isOpen={isOpen}
      isSubmitDisabled={!isValid || isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      onSecondaryAction={onSignUpClick}
    >
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

export default LoginModal;
