import styles from './PropertyRating.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const PropertyRating = () => {
    return (
        <Container>
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
            <Row className={`my-2  ${styles["ff-2"]}`}>
                <Col xs={12} md={6} className='g-2 me-5'>
                    <div className={`my-3 ${styles["rating-row"]}`}>
                        <span className="me-2 ">Чистота</span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={4.9}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>

                    <div className={`mb-3 ${styles["rating-row"]}`}>
                        <span className="me-2">Комунікація</span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={4.9}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>

                     <div className={`my-3 ${styles["rating-row"]}`}>
                        <span className="me-2">Прибуття</span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={5}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>
                </Col>
                <Col xs={11} md={5} className='g-2 ms-4'>
                    <div className={`my-3 ${styles["rating-row"]}`}>
                        <span className="me-2">Точність</span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={5}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>

                    <div className={`mb-3 ${styles["rating-row"]}`}>
                        <span className="me-2">Розташування</span>
                        <div className={styles["rating-bar"]}> <progress max="5" value={5}></progress>
                            <span className="ms-2">4,9</span>
                        </div>
                    </div>
                     <div className={`my-3 ${styles["rating-row"]}`}>
                        <span className="me-2">Ціна/якість</span>
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