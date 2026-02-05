function ItemCard({ item, onCardClick }) {
  return (
  <li className="item-card">
    <img
      className="item-card__image"
      src={item.link}
      alt={item.name}
      onClick={() => onCardClick(item)}
    />
    <p className="item-card__name">{item.name}</p>
  </li>
);
}

export default ItemCard;