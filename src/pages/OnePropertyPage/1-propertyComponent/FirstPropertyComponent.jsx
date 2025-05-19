import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './FirstPropertyComponent.module.css';
function FirstPropertyComponent() {

    const [isSaved, setIsSaved] = useState(false);

    const toggleSave=()=>{
        setIsSaved(prev=>!prev);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.h2}>Студія та спальня з панорамою на місто! Біля моря!</h2>
            <div className={styles["custom-row"]}>
                <div className={styles["left-block"]}>
                    <span>
                        <i className="bi bi-star-fill me-2"></i>
                        4,95
                    </span>
                    <span className={styles['dot-divider']}></span>
                    <span>
                        35 відгуків
                    </span>
                    <span className={styles['dot-divider']}></span>
                    <span>
                        Одеса, Одеська область, Україна
                    </span>
                </div>
                <div className={styles["left-block"]}>
                    
                    <Link className={styles["centered-link"]}>
                            <span className="material-symbols-outlined">share</span>
                            {/* <i className="bi bi-share-fill"></i> */}
                            <span className={styles["underline-text"]}>Поділитися</span>
                            </Link>
                    <span onClick={toggleSave}
                        className={styles["centered-link"]}>
                        <span className={styles.smallIcon}>
                             <span className="material-symbols-outlined"> 
                            {isSaved? 'favorite':'favorite_border'}</span>
                        </span>
                        <span className={styles["underline-text"]}>Зберегти</span>
                        </span>
                </div>
            </div>
        </div>
    )
}

export default FirstPropertyComponent;