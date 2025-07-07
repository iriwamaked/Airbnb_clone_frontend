// import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import SimpleFooter from "../SimpleFooter/SimpleFooter"; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
     

      
      <div >
       <SimpleFooter />
      </div>
    </footer>
  );
};

export default Footer;
