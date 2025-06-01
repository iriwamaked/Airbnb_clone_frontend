import { Container, Row, Col } from 'react-bootstrap';
import styles from './PropertyReview.module.css';

const PropertyReview = () => {
    return (
        <>
            <Container className={styles["ff-2"]}>
                <Row className="my-5">
                    <Col>
                        <div className="d-flex align-items-start mb-2">
                            <img src="/testDataProperty/img/reviews/oleksandr.png" alt="Oleksandr" className="me-2" />
                            <span className="fw-bold">Oleksandr</span>
                        </div>
                        <p>Однозначно рекомендую, все було на високому рівні </p>
                    </Col>
                    <Col>
                        <div className="d-flex align-items-start mb-2">
                            <img src="/testDataProperty/img/reviews/darina.png" alt="Darina" className="me-2"/>
                            <span className="fw-bold">Дарина</span>
                        </div>
                        <p>Дуже дякую за гарны апартаменти! Дуже близько до пляжу, а сама квартира просто вау!</p>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col>
                        <div className="d-flex align-items-start mb-2">
                            <img src="/testDataProperty/img/reviews/darya.png" alt="Darya" className="me-2" />
                            <span className="fw-bold">Дарья</span>
                        </div>
                        <p>Всі фото відповідають дійсності. Виз з вікна просто неймовірний! Рошташування дуже зручне,
                            2 хвилини пішки до моря і до траси здоров'я. </p>
                    </Col>
                    <Col>
                        <div className="d-flex align-items-start mb-2">
                            <img src="/testDataProperty/img/reviews/daniil.png" alt="Daniil" className="me-2"/>
                            <span className="fw-bold">Даниил</span>
                        </div>
                        <p>Все  пройшло чудово! Місцерозташування квартири, саме житло та господар - 5 зірок! Рекомендую.</p>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col>
                        <div className="d-flex align-items-start mb-2">
                            <img src="/testDataProperty/img/reviews/cergei.png" alt="Sergei" className="me-2"/>
                            <span className="fw-bold">Сергій</span>
                        </div>
                        <p>Все було чудово! Дар'я завжди готова допомогти! Вид з вікна окреми вид задоволення.</p>
                    </Col>
                    <Col>
                        <div className="d-flex align-items-start mb-2">
                            <img src="/testDataProperty/img/reviews/sveta.png" alt="Sveta" className="me-2"/>
                            <span className="fw-bold">Sveta</span>
                        </div>
                        <p>Дуже гарна квартира і дуже гарна господиня. Прекрасний вид на найкраще в світі море!!!
                            Це відпочино для душі!!! Даша, дуже дуже вам дякую за все.
                        </p>
                    </Col>
                </Row>

               <button className={styles.button}>
                    Показати всі 35 відгуків
               </button>
            </Container>
        </>
    );
}

export default PropertyReview;