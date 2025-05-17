import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VerificationEntryPage.module.css";

const VerificationEntryPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>Г</div>
          <div className={styles.userInfo}>
            <p className={styles.username}>Гість</p>
            <span className={styles.role}>Гість</span>
          </div>
        </div>

        <div className={styles.verifyBox}>
          <p className={styles.verifyTitle}>Підтверджена інформація про користувача</p>
          <ul>
            <li><span className={styles.check}>✔</span> Електронна адреса</li>
          </ul>
          <div className={styles.divider}></div>
          <p className={styles.subheading}>Верифікація особи</p>
          <p className={styles.smallText}>
            Перш ніж бронювати або приймати гостей на <b>HomeFU</b>, потрібно виконати цей крок.
          </p>
          <button className={styles.outlineBtn} onClick={() => navigate("/verification")}>
            Пройти верифікацію
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.createBox}>
          <hr className={styles.line} />
          <p className={styles.rightTitle}>Час створити свій профіль</p>
          <p className={styles.smallText}>
            Ваш профіль на <b>HomeFU</b> є важливою складовою кожного бронювання. Створіть профіль,
            щоб інші господарі та гості могли більше про вас дізнатися.
          </p>
          <button className={styles.filledBtn} onClick={() => navigate("/profile")}>
            Створити профіль
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationEntryPage;
