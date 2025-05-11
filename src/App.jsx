import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ListingPage from "./pages/ListingPage/ListingPage";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import VerificationPage from "./pages/VerificationPage/VerificationPage";
import AuthModalWrapper from "./components/Authorization/AuthModalWrapper";
import { getUser, logout } from "./utils/auth";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false); // Переключение карты
  const navigate = useNavigate();
  //const user = getUser();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("🔒 Пользователь в Redux:", user);


  const handleLogout = () => {
    logout();
    navigate("/");
  };
  //console.log("App рендерится");

  return (
    <div className="app">
      <Header 
        onOpenModal={() => !user && setIsModalOpen(true)} 
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
        <AuthModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<ListingPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <HomePage />} />
        <Route path="/verification" element={user ? <VerificationPage /> : <HomePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
