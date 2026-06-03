import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems = [],
  onCardClick,
  onCardLike,
  onAddClick,
  onEditProfileClick,
  onLogout,
}) {
  return (
    <main className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onAddClick={onAddClick}
      />
    </main>
  );
}

export default Profile;
