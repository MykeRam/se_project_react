import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ user = {}, clothingItems = [], onCardClick, onAddClick }) {
  return (
    <main className="profile">
      <SideBar user={user} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </main>
  );
}

export default Profile;
