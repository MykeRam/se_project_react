import { useContext } from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";

function Header({
  weatherData = {},
  onAddClick,
  onLoginClick,
  onRegisterClick,
  isAuthChecked,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const location = weatherData.location || "";
  const userName = currentUser?.name || "Profile";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "";
  const avatar = currentUser?.avatar || "";
  const isLoggedIn = Boolean(currentUser);
  const showAuthButtons = isAuthChecked && !isLoggedIn;

  return (
    <header className="header">
      <h1 className="visually-hidden">What to Wear</h1>
      <nav className="header__nav" aria-label="Main navigation">
        <div className="header__left">
          <Link className="header__logo-link" to="/">
            <div className="header__logo">wtwr&deg;</div>
          </Link>
          <p className="header__date-location">
            {currentDate}
            {location ? `, ${location}` : ""}
          </p>
        </div>

        <div className="header__right">
          <ToggleSwitch />

          {isLoggedIn ? (
            <>
              <button
                className="header__add-button"
                type="button"
                onClick={onAddClick}
              >
                + Add clothes
              </button>

              <Link className="header__profile-link" to="/profile">
                <p className="header__username">{userName}</p>
                {avatar ? (
                  <img className="header__avatar" src={avatar} alt={userName} />
                ) : (
                  <span className="header__avatar header__avatar_placeholder">
                    {userInitial}
                  </span>
                )}
              </Link>
            </>
          ) : showAuthButtons ? (
            <div className="header__auth-actions">
              <button
                className="header__auth-button header__auth-button_type_secondary"
                type="button"
                onClick={onLoginClick}
              >
                Log in
              </button>
              <button
                className="header__auth-button header__auth-button_type_primary"
                type="button"
                onClick={onRegisterClick}
              >
                Sign up
              </button>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}

export default Header;
