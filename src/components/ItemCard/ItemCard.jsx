import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heartEmpty from "../../images/icons/heart-empty.png";
import heartSelected from "../../images/icons/heart-selected.png";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const currentUserId = currentUser?._id ?? currentUser?.id ?? null;
  const itemLikes = item.likes ?? [];
  const isLoggedIn = Boolean(currentUserId);
  const isLiked =
    isLoggedIn &&
    itemLikes.some((likedUserId) => String(likedUserId) === String(currentUserId));

  function handleLike(event) {
    event.stopPropagation();
    onCardLike({
      id: item._id,
      isLiked,
    });
  }

  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <img className="item-card__image" src={item.imageUrl} alt={item.name} />
      <p className="item-card__name">{item.name}</p>
      {isLoggedIn ? (
        <button
          className={`item-card__like-button ${
            isLiked ? "item-card__like-button_active" : ""
          }`}
          type="button"
          aria-label={isLiked ? "Unlike item" : "Like item"}
          onClick={handleLike}
        >
          <img
            className="item-card__like-icon"
            src={isLiked ? heartSelected : heartEmpty}
            alt=""
            aria-hidden="true"
          />
        </button>
      ) : null}
    </li>
  );
}

export default ItemCard;
