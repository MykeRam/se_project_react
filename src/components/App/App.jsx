import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />

      <ModalWithForm />
      <ItemModal />
    </div>
  );
}

export default App;