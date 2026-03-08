import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems = [], onCardClick, onAddClick }) {
  const itemsGapClass =
    clothingItems.length > 4
      ? "clothes-section__items_gap_85"
      : "clothes-section__items_gap_171";

  return (
    <section className="clothes-section">
      <div className="clothes-section__top">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          className="clothes-section__add-new"
          type="button"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>

      <ul className={`clothes-section__items ${itemsGapClass}`}>
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
