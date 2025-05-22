import { useDispatch } from "react-redux";
import { setSelfieImage, setDocumentImage, nextStep,prevStep } from "../../../store/slices/verificationSlice";
import { useState } from "react";
import styles from "./StepPhotoUpload.module.css";

const StepPhotoUpload = () => {
  const dispatch = useDispatch();
  const [selfie, setSelfie] = useState(null);
  const [document, setDocument] = useState(null);

  const handleSubmit = () => {
  const fakeSelfie = selfie || new File(["selfie"], "selfie.jpg", { type: "image/jpeg" });
  const fakeDoc = document || new File(["doc"], "doc.jpg", { type: "image/jpeg" });

  dispatch(setSelfieImage(fakeSelfie));
  dispatch(setDocumentImage(fakeDoc));
  dispatch(nextStep());
};


  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Завантажте зображення свого посвідчення водія</h2>
      <p className={styles.subtitle}>Фотографії не мають бути розмиті, а на лицьовому боці посвідчення водія має бути чітко видно ваше обличчя.</p>

      <div className={styles.uploadGrid}>
        {/* Лицьова */}
        <label className={styles.uploadBox}>
        <span className={`material-icons ${styles.icon}`}>co_present</span>
           <span>Завантажте лицьовий бік<br /><small className={styles.small}>Лише JPG або PNG</small></span>
          <input type="file" accept="image/*" onChange={e => setSelfie(e.target.files[0])} hidden />
        </label>

        {/* Зворотня */}
        <label className={styles.uploadBox}>
        <span className={`material-icons ${styles.icon}`}>credit_card</span>
          <span>Завантажте зворотній бік<br /><small className={styles.small}>Лише JPG або PNG</small></span>
          <input type="file" accept="image/*" onChange={e => setDocument(e.target.files[0])} hidden />
        </label>
      </div>
    <div className={styles.divider}></div>

      <div className={styles.buttons}>
<button className={styles.backBtn} onClick={() => dispatch(prevStep())}>&lt; Назад</button>
        <button className={styles.primaryBtn} onClick={handleSubmit}>Продовжити</button>
      </div>
    </div>
  );
};

export default StepPhotoUpload;
