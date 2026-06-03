import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onLogout, onEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return null;
  }

  return (
    <aside className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar || ""}
        alt={currentUser.name || "profile avatar"}
      />
      <div className="sidebar__content">
        <p className="sidebar__name">{currentUser.name || "Profile"}</p>
        <div className="sidebar__actions">
          <button
            className="sidebar__button sidebar__button_type_primary"
            type="button"
            onClick={onEditProfileClick}
          >
            Edit profile
          </button>
          <button
            className="sidebar__button sidebar__button_type_secondary"
            type="button"
            onClick={onLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
