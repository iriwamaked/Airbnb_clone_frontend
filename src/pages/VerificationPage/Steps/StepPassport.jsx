import { useDispatch, useSelector } from "react-redux";
import { setDocumentType, nextStep } from "../../../store/slices/verificationSlice";
import styles from "./StepPassport.module.css";

const StepPassport = () => {
  const dispatch = useDispatch();
  const selectedType = useSelector(state => state.verification.data.documentType);

  const handleSelect = (type) => {
    dispatch(setDocumentType(type));
  };

  const handleContinue = () => {
    if (selectedType) dispatch(nextStep());
  };

  return (
   <div className={styles.wrapper}>
  <div className={styles.outerContainer}>
    
      <h2 className={styles.title}>Виберіть відповідний тип посвідчення особи</h2>
      <input
        type="text"
        className={styles.inputField}
      />
    

    <div className={styles.innerContainer}>
      <div className={styles.radioGroup}>
        <label className={styles.radioItem}>
          <span>Посвідчення водія</span>
          <input
            type="radio"
            name="documentType"
            checked={selectedType === "driver_license"}
            onChange={() => handleSelect("driver_license")}
          />
          <span className={styles.customRadio}></span>
        </label>
    <div className={styles.divider}></div>

        <label className={styles.radioItem}>
          <span>Паспорт</span>
          <input
            type="radio"
            name="documentType"
            checked={selectedType === "passport"}
            onChange={() => handleSelect("passport")}
          />
          <span className={styles.customRadio}></span>
        </label>

        
      <div className={styles.divider}></div>

      <label className={styles.radioItem}>
        <span>Посвідчення особи</span>
        <input
          type="radio"
          name="documentType"
          checked={selectedType === "id_card"}
          onChange={() => handleSelect("id_card")}
        />
        <span className={styles.customRadio}></span>
      </label>
    </div>

    <p className={styles.note}>
      Ваше посвідчення особи оброблятиметься відповідно до нашої{" "}
      <a href="#">Політики конфіденційності</a> та не надаватиметься господарю або гостям.
    </p>

    <div className={styles.divider}></div>

    <div className={styles.buttons}>
      <button className={styles.backBtn}>&lt; Назад</button>
      <button className={styles.primaryBtn} onClick={handleContinue}>Продовжити</button>
    </div>
  </div>
</div>
</div>

  );
};

export default StepPassport;
