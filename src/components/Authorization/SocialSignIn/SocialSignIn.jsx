import styles from "./SocialSignIn.module.css";
import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from "../../../api/userApi"; 


const SocialSignIn = () => {
  const googleLogin = useGoogleLogin({
  onSuccess: async (res) => {
    try {
      const response = await loginWithGoogle(res.access_token);
      console.log("🎉 Ответ от бэка:", response.data);
    } catch (err) {
      console.error("❌ Ошибка отправки токена:", err);
    }
  },
});

  const handleFacebookLogin = () => {
  FB.login((response) => {
    if (response.authResponse) {
      console.log("✅ Facebook токен:", response.authResponse.accessToken);
      // TODO: отправить токен на backend, как с Google
    } else {
      console.error("❌ Вход через Facebook отменён");
    }
  }, {scope: 'email'});
};

  const handleAppleLogin = () => {
    console.log("🍎 Попытка входа через Apple");

    alert("Вход через Apple в разработке 🚧");
    // TODO: добавить реализацию OAuth Apple
  };

  return (
    <div className={styles.socialButtons}>
      <button className={styles.google} onClick={() => googleLogin()}>
        <i className="bi bi-google"></i>
        Войти через Google
      </button>

      <button className={styles.facebook} onClick={handleFacebookLogin}>
        <i className="bi bi-facebook"></i>
        Войти через Facebook
      </button>

      <button className={styles.apple} onClick={handleAppleLogin}>
        <i className="bi bi-apple"></i>
        Войти через Apple
      </button>
    </div>
  );
};

export default SocialSignIn;
