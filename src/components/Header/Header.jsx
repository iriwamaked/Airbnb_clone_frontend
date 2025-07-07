import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import PropTypes from "prop-types";
// import SearchBar from "../SearchBar/SearchBar";
import SearchPanel from "../SearchPanel/SearchPanel";
// import { Loader } from "@googlemaps/js-api-loader";
// import { loadGoogleMaps } from "../../utils/loadGoogleMaps";

// const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// const loader = new Loader({
//   apiKey: apiKey,
//   libraries: ['places'],
// });

// import { useLoadGoogleMaps } from "../../hooks/useLoadGoogleMapsLib";

const Header = ({ onOpenModal, user, onLogout, onToggleMap, isAuthenticated}) => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const isVerificationFlow = location.pathname.startsWith("/verification");
  const withUnderline = location.pathname.startsWith("/verification");

  // const googleApiLoaded = useLoadGoogleMaps();
  const [isActive, setIsActive] = useState(false);
  let timer;

  // useEffect(() => {
  //  loadGoogleMaps()
  //     .then(() => setGoogleApiLoaded(true))
  //     .catch(err => console.error('Ошибка загрузки Google Maps API:', err));
  // }, []);

  const handleFocus = () => {
    clearTimeout(timer);
    setIsActive(true);
  };

  const handleBlur = () => {
    timer = setTimeout(() => setIsActive(false), 3000);
  };

  // const handleSearch = (query) => {
  //   console.log("🔍 Поиск по запросу:", query);
  // };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);


  return (
    <header className={`${styles.header} ${withUnderline ? styles.underline : ""} ${isActive ? styles.active : ""}`}>
      <div className={`${styles.row} ${styles["top-row"]}`}>
        {/* Логотип */}
        <Link to="/" className={styles.logo}>HomeFU</Link>

        {/* Навигация */}
        {!isProfilePage && !isVerificationFlow && (

          <nav className={styles.nav}>
            <a href="#">Варіанти помешкань</a>
            <a href="#">Враження</a>
            <a href="#">Онлайн-враження</a>
          </nav>
        )}

        {/* Кнопки справа */}
        <div className={styles.rightButtons}>
          {!isProfilePage && (
            <Link to="/listings" className={styles.offerBtn}>
              Запропонувати помешкання на HomeFU
            </Link>
          )}

          {!isProfilePage && location.pathname === "/listings" && (
            <button className={styles.mapButton} onClick={onToggleMap}>
              📍 Показать на карте
            </button>
          )}

          {isAuthenticated ? (
  <div className={styles.userAvatarWrapper}>
    <Link to="/profile">
      {user.avatar ? (
        <img src={user.avatar} alt="avatar" className={styles.userAvatarImg} />
      ) : (
        <div className={styles.userAvatarCircle}>
          {user.username?.charAt(0).toUpperCase()}
        </div>
      )}
    </Link>
    <button onClick={onLogout} className={styles.logoutIcon}>
      <span className="material-icons">logout</span>
    </button>
  </div>
) : (
  <button className={styles.loginBtn} onClick={onOpenModal}>
    <span className="material-icons">person</span>
  </button>
)}


        </div>
      </div>
      <div className={styles.searchContainer} onMouseEnter={handleFocus} onMouseLeave={handleBlur}>
               
        <SearchPanel/>
        {/* {googleApiLoaded ? (
          <SearchPanel />
        ) : (
          <div style={{ padding: "10px", textAlign: "center" }}>
            ⏳ Завантаження карти та підказок...
          </div>)}*/}
      </div> 

    </header>
  );
};

Header.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  onLogout: PropTypes.func.isRequired,
  onToggleMap: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Header;
