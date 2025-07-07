import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignInForm.module.css";
import SocialSignIn from "../SocialSignIn/SocialSignIn";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginUser } from "../../../store/slices/authSlice";
import { GoogleLogin } from '@react-oauth/google';


const dummyUser = {
  username: "user",
  email: "user@com",
  isVerified: false,
};


const SignInForm = ({ onClose, onSwitch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const resultAction = await dispatch(loginUser({ username, password }));
  
    if (loginUser.fulfilled.match(resultAction)) {
  const user = resultAction.payload.user;

  // 👉 если нет профиля или он не заполнен
  const isProfileEmpty = !user.profile || Object.values(user.profile).every(v => v === "" || (Array.isArray(v) && v.length === 0));

  // 👉 если не верифицирован
  const isNotVerified = user.isVerified === false;

  if (isProfileEmpty) {
    navigate("/profile");
  } else if (isNotVerified) {
    navigate("/verification");
  } else {
    navigate("/"); // или /dashboard, как тебе надо
  }
      onClose();
    } else {
      setErrorMessage(resultAction.payload || "Ошибка входа");
      setShake(false);
      setTimeout(() => setShake(true), 10); // достаточно даже 10мс
    }
  };
  

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Войти</h2>

      {errorMessage && (
        <div className={`${styles.errorMessage} ${shake ? styles.shake : ""}`}>
          {errorMessage}
        </div>
      )}



      <input type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className={styles.submitBtn}>Войти</button>

      <div className={styles.orDivider}>или</div>
      <SocialSignIn />

      <p className={styles.registerLink}>
  Нет аккаунта? <span onClick={onSwitch}>Зарегистрируйтесь</span>
</p>

    </form>
  );
};

SignInForm.propTypes={
  onClose: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
};

export default SignInForm;
