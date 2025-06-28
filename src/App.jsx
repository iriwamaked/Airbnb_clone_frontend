import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/slices/authSlice";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SimpleFooter from "./components/SimpleFooter/SimpleFooter";

import HomePage from "./pages/HomePage/HomePage";
import ListingPage from "./pages/ListingPage/ListingPage";
import PropertyPageMain from "./pages/PropertyPageMain/PropertyPageMain";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import VerificationPage from "./pages/VerificationPage/VerificationPage";
import VerificationEntryPage from "./pages/VerificationEntryPage/VerificationEntryPage";
import OnePropertyPage from "./pages/OnePropertyPage/OnePropertyPage";
import TestPage from "./pages/TestPage";
import SinglePropertyPage from "./pages/SinglePropertyPage/SinglePropertyPage";

import AuthModalWrapper from "./components/Authorization/AuthModalWrapper";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const pathname = location.pathname;
  const useSimpleFooter = ["/profile", "/verification", "/verification-start"].some(path =>
    pathname.startsWith(path)
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
          <Route path="/test" element={<TestPage />} />
          <Route path="/singleproperty" element={<SinglePropertyPage />} />
        </Routes>
      </main>

      {useSimpleFooter ? <SimpleFooter /> : <Footer />}
    </div>
  );
}

export default App;
