import styles from './PropertyRating.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PropertyRating = ({ rating, reviewsNumber, ratingCriterias }) => {
    const half = Math.ceil(ratingCriterias.length / 2)
    const leftCol = ratingCriterias.slice(0, half);
    const rightCol = ratingCriterias.slice(half);

    return (
        <Container className="pe-5">
            <div className={`mb-2 ${styles["ff-1"]} ${styles["fw-500"]}`}>
                <span className="me-2">
                    <i className="bi bi-star-fill me-2"></i>
                    {rating}
                </span>
                <span className={`me-2  ${styles['dot-divider']}`}></span>
                <span>
                    {reviewsNumber} відгуків
                </span>
            </div>
            <Row className={`my-2 g-3 ${styles["ff-2"]}`}>
                <Col className="me-5">
                    {leftCol.map(({ name, score }, index) => (
                        <div key={index} className={styles["rating-row"]}>
                            <span>{name}</span>
                            <div className={styles["rating-bar"]}>
                                <progress max="5" value={score}></progress>
                                <span className="ms-2">{score.toFixed(1).replace('.', ',')}</span>
                            </div>
                        </div>
                    ))}
                </Col>
                <Col className="ms-2">
                    {rightCol.map(({ name, score }, index) => (
                        <div key={index} className={styles["rating-row"]}>
                            <span>{name}</span>
                            <div className={styles["rating-bar"]}>
                                <progress max="5" value={score}></progress>
                                <span className="ms-2">{score.toFixed(1).replace('.', ',')}</span>
                            </div>
                        </div>
                    ))}
                </Col>
            </Row>


        </Container>

    );
}

PropertyRating.propTypes={
    rating: PropTypes.number.isRequired,
    reviewsNumber: PropTypes.number.isRequired,
    ratingCriterias: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            score: PropTypes.number.isRequired
        }
        ).isRequired
    )
}

export default PropertyRating;