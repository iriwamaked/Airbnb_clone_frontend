import { useNavigate } from "react-router-dom";
import styles from "./StepDone.module.css"; // создай файл или допиши в общий CSS

const StepDone = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>✅ Верифікація завершена!</h2>
        <p>Ваші документи успішно завантажено і відправлено на перевірку.</p>
        <p className={styles.subtext}>
          Зазвичай перевірка займає до 24 годин. Ви отримаєте повідомлення після підтвердження.
        </p>

        <div className={styles.buttons}>
          <button onClick={() => navigate("/")} className={styles.outlinedBtn}>
            На головну
          </button>
          <button onClick={() => navigate("/profile")} className={styles.primaryBtn}>
            До профілю
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepDone;
