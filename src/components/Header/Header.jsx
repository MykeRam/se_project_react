import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ weatherData = {}, onAddClick, user = {} }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const location = weatherData.location || "";
  const userName = user.name || "Profile";
  const avatar = user.avatar || "";

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

          <button
            className="header__add-button"
            type="button"
            onClick={onAddClick}
          >
            + Add clothes
          </button>

          <Link className="header__profile-link" to="/profile">
            <p className="header__username">{userName}</p>
            <img className="header__avatar" src={avatar} alt={userName} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
