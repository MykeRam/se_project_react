function ItemCard({ item }) {
  return (
    <li className="item-card">
      <p className="item-card__name">{item.name}</p>
    </li>
  );
}

export default ItemCard;