import styles from "./SocialSignIn.module.css";

const SocialSignIn = () => {
  const handleSocialSignIn = (provider) => {
    console.log(`Вход через ${provider}`);
    alert(`Вход через ${provider} в разработке 🚧`);
  };

  return (
    <div className={styles.socialButtons}>
      <button onClick={() => handleSocialSignIn("Google")} className={styles.google}>
        <i className="bi bi-google"></i>

        Войти через Google
      </button>
      <button onClick={() => handleSocialSignIn("Facebook")} className={styles.facebook}>
<i className="bi bi-facebook"></i>
        Войти через Facebook
      </button>
      <button onClick={() => handleSocialSignIn("Apple")} className={styles.apple}>
        <i className="bi bi-apple"></i>
        Войти через Apple
      </button>
    </div>
  );
};

export default SocialSignIn;
