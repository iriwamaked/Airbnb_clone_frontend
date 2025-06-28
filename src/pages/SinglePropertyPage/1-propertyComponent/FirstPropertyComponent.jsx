
import { useState } from 'react';
import styles from './FirstPropertyComponent.module.css';
import PropTypes from 'prop-types';
import ShareButton from '../../../components/ShareBtn/ShareButton';

function FirstPropertyComponent({title, rating, reviewsNumber, location, imageUrl, shortDescription}) {

    const [isSaved, setIsSaved] = useState(false);

    const toggleSave = () => {
        console.log("Зберегти натиснуто");
        setIsSaved(prev => !prev);
    }

    return (
        <div className="m-3">
            <h2 className={styles.h2}>{title}</h2>
            <div className={styles["custom-row"]}>
                <div className={styles["left-block"]}>
                    <span>
                        <i className="bi bi-star-fill me-2"></i>
                        {rating}
                    </span>
                    <span className={styles['dot-divider']}></span>
                    <span>
                        {reviewsNumber} відгуків
                    </span>
                    <span className={styles['dot-divider']}></span>
                    <span>
                       {location}
                    </span>
                </div>
                <div className={styles["left-block"]}>
                    <ShareButton imageUrl={imageUrl} shortDescription={shortDescription} title={title} />
                    {/* <Link className={styles["centered-link"]}>
                        <i className="bi bi-share"></i>
                        <span className={styles["underline-text"]}>Поділитися</span>
                    </Link> */}
                    <span onClick={toggleSave}
                        className={styles["centered-link"]}>
                        <span className={styles.smallIcon}>
                            <i className={`bi ${isSaved ? "bi-heart-fill" : "bi-heart"}`}></i>
                        </span>
                        <span className={styles["underline-text"]}>Зберегти</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

FirstPropertyComponent.propTypes={
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewsNumber: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired
}

export default FirstPropertyComponent;