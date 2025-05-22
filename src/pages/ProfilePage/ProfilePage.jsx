import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserById, updateUserProfile } from "../../api/userApi";
import debounce from "lodash.debounce";
import styles from "./ProfilePage.module.css";

// Дебаунс автосохранения
const debouncedSave = debounce(async (id, updatedProfile) => {
  try {
    await updateUserProfile(id, updatedProfile);
    console.log("✅ Профиль збережено");
  } catch (err) {
    console.error("❌ Помилка збереження профілю:", err);
  }
}, 800);

const ProfilePage = () => {
  const navigate = useNavigate();
  const userFromRedux = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const id = userFromRedux?.id || 2; // по умолчанию user #2
      const data = await getUserById(id);
      setUser(data);
    };
    loadUser();
  }, [userFromRedux]);

  if (!user) return <div>Завантаження...</div>;

  const handleProfileChange = (field, value) => {
    const updatedProfile = { ...user.profile, [field]: value };
    const updatedUser = { ...user, profile: updatedProfile };
    setUser(updatedUser);
    debouncedSave(user.id, updatedProfile);
  };

  const fields = [
    { key: "school", label: "Навчальний заклад" },
    { key: "profession", label: "Моя професія" },
    { key: "location", label: "Місце проживання" },
    { key: "languages", label: "Мови, якими я володію", isArray: true },
    { key: "birthdate", label: "Десятиклас, коли я народився/лася" },
    { key: "favSong", label: "Улюблена пісня зі старших класів" },
    { key: "hobbies", label: "Найбільше захоплення" },
    { key: "funFact", label: "Цікавий факт про мене" },
    { key: "lifeGoals", label: "Найбільші надії в житті" },
    { key: "bioTitle", label: "Бажаний заголовок біографії" },
    { key: "timeSpentOn", label: "На що я витрачаю багато часу" },
    { key: "pets", label: "Домашні тварини" }
  ];

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profilePage}>
        {/* Аватар */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarUpload}>
            <div className={styles.avatarCircle}>
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" className={styles.avatarImg} />
              ) : (
                user.username.charAt(0).toUpperCase()
              )}
            </div>
            <label htmlFor="avatarUpload" className={styles.uploadBtn}>
              <span className="material-icons-outlined">photo_camera</span>
              Додати
            </label>
            <input type="file" id="avatarUpload" hidden />
          </div>
        </div>

        {/* Профиль */}
        <div className={styles.formSection}>
          <h2>Ваш профіль</h2>
          <p className={styles.introText}>
            Інформація, яку ви надаєте, буде використовуватись на <b>HomeFU</b>, щоб інші гості й господарі мали змогу познайомитись з вами.
          </p>

          <div className={styles.fieldGrid}>
            {fields.map(({ key, label, isArray }, i) => (
              <div className={styles.underlineField} key={i}>
                <span className={styles.placeholder}>{label}</span>
                <input
                  type="text"
                  value={isArray ? (user.profile?.[key]?.join(", ") || "") : (user.profile?.[key] || "")}
                  onChange={(e) => {
                    const val = isArray ? e.target.value.split(",").map(s => s.trim()) : e.target.value;
                    handleProfileChange(key, val);
                  }}
                />
              </div>
            ))}
          </div>

          <div className={styles.bioSection}>
            <h3>Інформація про вас</h3>
            <div className={styles.bioInputWrapper}>
              <textarea
                placeholder="Напишіть щось веселе й неординарне…"
                rows="4"
                value={user.profile?.about || ""}
                onChange={(e) => handleProfileChange("about", e.target.value)}
              />
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
