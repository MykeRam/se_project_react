import { useState } from "react";
import "./Header.css";

function Header({ weatherData, onAddClick, user }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpened((prev) => !prev);
  }

  const navClassName = `header__right ${
    isMobileMenuOpened ? "header__right_opened" : ""
  }`;

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">WTWR</div>
        <p className="header__date-location">
          {currentDate}, {weatherData.location}
        </p>
      </div>

      {/* Hamburger button (shows on mobile when menu is closed) */}
      {!isMobileMenuOpened && (
        <button
          className="header__menu-button"
          type="button"
          aria-label="Open menu"
          onClick={toggleMobileMenu}
        />
      )}

      <div className={navClassName}>
        {/* Close button (shows only when menu is opened on mobile) */}
        {isMobileMenuOpened && (
          <button
            className="header__close-button"
            type="button"
            aria-label="Close menu"
            onClick={toggleMobileMenu}
          />
        )}

        <button className="header__add-button" type="button" onClick={onAddClick}>
          + Add Clothes
        </button>

        <p className="header__username">{user.name}</p>
        <img className="header__avatar" src={user.avatar} alt={user.name} />
      </div>
    </header>
  );
}

export default Header;