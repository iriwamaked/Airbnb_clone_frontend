import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ProfilePage.module.css";

const dummyUser = {
  username: "Тестовый Юзер",
  email: "testuser@example.com",
};

const labels = [
  "Навчальний заклад",
  "Моя професія",
  "Місце проживання",
  "Мови, якими я володію",
  "Десятиклас, коли я народився/лася",
  "Улюблена пісня зі старших класів",
  "Найбільше захоплення",
  "Цікавий факт про мене",
  "Найбільші надії в житті",
  "Бажаний заголовок біографії",
  "На що я витрачаю багато часу",
  "Домашні тварини"
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const userFromRedux = useSelector((state) => state.auth.user);
  const user = userFromRedux || dummyUser;

  return (
      <div className={styles.profileWrapper}>

    <div className={styles.profilePage}>
      {/* Левая колонка с аватаром */}
      <div className={styles.avatarSection}>
      <div className={styles.avatarUpload}>
      <div className={styles.avatarCircle}>
      {user.username.charAt(0).toUpperCase()}
      </div>
    <label htmlFor="avatarUpload" className={styles.uploadBtn}>
<span className="material-icons-outlined">photo_camera</span>
      Додати
    </label>
    <input type="file" id="avatarUpload" hidden />
  </div>
</div>


      {/* Правая колонка с полями */}
      <div className={styles.formSection}>
        <h2>Ваш профіль</h2>
        <p className={styles.introText}>
          Інформація, яку ви надаєте, буде використовуватись на <b>HomeFU</b>, щоб інші гості й господарі мали змогу познайомитись з вами.
        </p>

        <div className={styles.fieldGrid}>
          {labels.map((label, i) => (
            <div className={styles.underlineField} key={i}>
              <span className={styles.placeholder}>{label}</span>
              <input type="text" />
            </div>
          ))}
        </div>

        <div className={styles.bioSection}>
  <h3>Інформація про вас</h3>
  <div className={styles.bioInputWrapper}>
    <textarea placeholder="Напишіть щось веселе й неординарне…" rows="4" />
    <span className={styles.addIntro}>Додати вступ</span>
  </div>
</div>

<div className={styles.loveSection}>
  <h3>Що ви найбільше любите?</h3>
  <p>
    Спілкуйтеся на групи спільний зацікавлень з іншими гостями та господарями, вказавши свої інтереси в профілі.
  </p>
  <div className={styles.icons}>
  <button>
    <span className="material-icons-outlined">add_circle_outline</span>
  </button>
  <button>
    <span className="material-icons-outlined">add_circle_outline</span>
  </button>
  <button>
    <span className="material-icons-outlined">add_circle_outline</span>
  </button>
</div>


</div>

      </div>
    </div>
        </div>

  );
};

export default ProfilePage;
