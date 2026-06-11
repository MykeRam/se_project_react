import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onLogout, onEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return null;
  }

  const userName = currentUser.name || "Profile";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <aside className="sidebar">
      {currentUser.avatar ? (
        <img className="sidebar__avatar" src={currentUser.avatar} alt={userName} />
      ) : (
        <span className="sidebar__avatar sidebar__avatar_placeholder">
          {userInitial}
        </span>
      )}
      <div className="sidebar__content">
        <p className="sidebar__name">{userName}</p>
        <div className="sidebar__actions">
          <button
            className="sidebar__button sidebar__button_type_primary"
            type="button"
            onClick={onEditProfileClick}
          >
            Change profile data
          </button>
          <button
            className="sidebar__button sidebar__button_type_secondary"
            type="button"
            onClick={onLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
