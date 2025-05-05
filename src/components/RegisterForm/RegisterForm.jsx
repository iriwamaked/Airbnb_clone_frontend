import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import SocialSignIn from "../SocialSignIn/SocialSignIn";
import PropTypes from "prop-types";

const RegisterForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    localStorage.setItem("user", JSON.stringify({ username: email }));
    navigate("/profile");
    onClose();
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
        Уже есть аккаунт? <span onClick={() => navigate("/sign-in")}>Войти</span>
      </p>
    </form>
  );
};


RegisterForm.propTypes={
  onClose: PropTypes.func.isRequired,
};
export default RegisterForm;
