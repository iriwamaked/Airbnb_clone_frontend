import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SimpleFooter from "./components/SimpleFooter/SimpleFooter";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ListingPage from "./pages/ListingPage/ListingPage";
import PropertyPageMain from "./pages/PropertyPageMain/PropertyPageMain";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import VerificationPage from "./pages/VerificationPage/VerificationPage";
import AuthModalWrapper from "./components/Authorization/AuthModalWrapper";
import VerificationEntryPage from './pages/VerificationEntryPage/VerificationEntryPage';


import { getUser, logout } from "./utils/auth";
import { useSelector } from "react-redux";

import OnePropertyPage from "./pages/OnePropertyPage/OnePropertyPage";

import styles from "./styles/App.module.css";
import TestPage from "./pages/TestPage";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false); // Переключение карты
  const navigate = useNavigate();
  //const user = getUser();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
const location = useLocation();
const pathname = location.pathname;
  console.log("🔒 Пользователь в Redux:", user);

const useSimpleFooter = ["/profile", "/verification", "/verification-start"].some(path =>
  pathname.startsWith(path)
);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  //console.log("App рендерится");

  return (
  <div className="app-layout">
    <Header 
      onOpenModal={() => !user && setIsModalOpen(true)} 
      user={user}
      isAuthenticated={isAuthenticated}
      onLogout={handleLogout}
    />

    <AuthModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    <main className="app-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<ListingPage />} />
        <Route path="/property/:id" element={<PropertyPageMain />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/verification-start" element={<VerificationEntryPage />} />
        <Route path="/oneproperty" element={<OnePropertyPage />} />
          <Route path="/test" element={<TestPage/>} />
      </Routes>
    </main>

    {useSimpleFooter ? <SimpleFooter /> : <Footer />}
  </div>
);

}

export default App;
