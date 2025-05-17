import styles from "./SimpleFooter.module.css";
import { Link } from "react-router-dom";

const SimpleFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span>© 2024 HomeFU, Inc.</span>
        <Link to="/privacy">Конфіденційність</Link>
        <Link to="/terms">Умови</Link>
        <Link to="/sitemap">Мапа сайту</Link>
      </div>
      <div className={styles.right}>
        <span>🌐 Українська (UA)</span>
        <span>$ USD</span>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <i className="material-icons">facebook</i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <i className="material-icons">photo_camera</i>
        </a>
      </div>
    </footer>
  );
};

export default SimpleFooter;
