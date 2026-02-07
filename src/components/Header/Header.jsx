import "./Header.css";

function Header({ weatherData, onAddClick, user }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">LOGO</div>

        <p className="header__date-location">
          {currentDate}, {weatherData.location}
        </p>
      </div>

      <div className="header__right">
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