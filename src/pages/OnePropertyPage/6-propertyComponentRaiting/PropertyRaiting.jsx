import styles from './PropertyRating.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const PropertyRating = () => {
    return (
        <Container className="pe-5">
            <div className={`mb-2 ${styles["ff-1"]} ${styles["fw-500"]}`}>
                <span className="me-2">
                    <i className="bi bi-star-fill me-2"></i>
                    4,95
                </span>
                <span className={`me-2  ${styles['dot-divider']}`}></span>
                <span>
                    35 відгуків
                </span>
            </div>
            <Row className={`my-2 g-5 ${styles["ff-2"]}`}>
                <Col className="me-5">
                    <div className={`${styles["rating-row"]}`}>
                        <span>Чистота</span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={4.9}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>  </Col>
                <Col className="me-5">
                    <div className={` ${styles["rating-row"]}`}>
                        <span >Точність</span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={5}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className={`mb-2 g-5 ${styles["ff-2"]}`}>
                <Col className="me-5">
                    <div className={`${styles["rating-row"]}`}>
                        <span>Комунікація </span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={4.9}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>  </Col>
                <Col className="me-5">
                    <div className={` ${styles["rating-row"]}`}>
                        <span >Розташування</span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={5}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className={`mb-3 g-5 ${styles["ff-2"]}`}>
                <Col className="me-5">
                    <div className={`${styles["rating-row"]}`}>
                        <span>Прибуття</span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={4.9}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>  </Col>
                <Col className="me-5">
                    <div className={` ${styles["rating-row"]}`}>
                        <span >Ціна/Якість</span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={5}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>
                </Col>
            </Row>


        </Container>

    );
}

export default PropertyRating;