import styles from "./StepDocumentUploadMethod.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { nextStep,prevStep } from "../../../store/slices/verificationSlice";

const StepDocumentUploadMethod = () => {
  const dispatch = useDispatch();
  const [method, setMethod] = useState("upload");

  const handleContinue = () => {
    dispatch(nextStep());
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2 className={styles.title}>Додайте посвідчення особи державного зразка</h2>
        <p className={styles.subtitle}>
          Вам потрібно буде додати посвідчення особи державного зразка.
          Цей крок допоможе переконатися, що це справді ви.
        </p>

        <div className={styles.radioBlock}>
          <label className={styles.radioItem}>
  <div className={styles.radioTextBlock}>
      <div className={styles.optionTitle}>Завантажити наявну фотографію</div>
      <div className={styles.optionSub}>Рекомендовано</div>
  </div>
  <input
    type="radio"
    name="method"
    value="upload"
    checked={method === "upload"}
    onChange={() => setMethod("upload")}
    className={styles.radioInput}
  />
  <span className={styles.customRadio}></span>
</label>

            <div className={styles.divider}></div>

          <label className={styles.radioItem}>
             <div className={styles.radioTextBlock}>

            <div className={styles.optionTitle}>
              Зробіть фотографію за допомогою вебкамери
            </div>
                        </div>

             <input
    type="radio"
    name="method"
    value="upload"
    checked={method === "upload"}
    onChange={() => setMethod("upload")}
    className={styles.radioInput}
  />
  <span className={styles.customRadio}></span>
          </label>
        </div>
        <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleContinue}>
          Продовжити
        </button>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.infoBox}>
          <h3>Ваша приватність</h3>
          <p>
            Ми докладаємо максимум зусиль для гарантії конфіденційності, безпеки й захисту ваших даних під час цієї перевірки.
            Докладніше про це читайте в нашій{" "}
            <a href="#">Політиці конфіденційності</a>.
          </p>
          <a href="#">Як здійснюється верифікація особи</a>
        </div>
      </div>
    </div>
  );
};

export default StepDocumentUploadMethod;
