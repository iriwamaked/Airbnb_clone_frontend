import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import SocialSignIn from "../SocialSignIn/SocialSignIn";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { registerUser } from "../../../store/slices/authSlice";
import { loginUser } from "../../../store/slices/authSlice"; // <-- Обязательно



const RegisterForm = ({ onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
  
    const resultAction = await dispatch(registerUser({ username: email, password }));
  
    if (registerUser.fulfilled.match(resultAction)) {
      console.log("✅ Успешная регистрация, выполняем вход...");
      const loginResult = await dispatch(loginUser({ username: email, password }));
      await dispatch(loginUser({ username: email, password }));
      onClose();
    } else {
      alert(`❌ ${resultAction.payload || 'Ошибка регистрации'}`);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <button type="submit">Зарегистрироваться</button>

      <div className={styles.orDivider}>или</div>
      <SocialSignIn />

      <p className={styles.loginLink}>
  Уже есть аккаунт? <span onClick={onSwitch}>Войти</span>
</p>

    </form>
  );
};


RegisterForm.propTypes={
  onClose: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
};
export default RegisterForm;
