import { Container, Col, Row } from "react-bootstrap";
import styles from "./PropertyOwner.module.css";

const PropertyOwner = () => {
    return (

        <Container className={styles["ff-2"]}>
            <Col xs={12} md={5}>
                <div className={styles.ownerRow}>
                    <div>
                        <img src="/testDataProperty/img/Owner70.png" alt="Ілона" />
                    </div>
                    <div className="mt-3">
                        <h5 className="fw-bold mb-6">Господар: Ілона</h5>
                        <p style={{ color: '#6F6558' }}>На HomeFu з листопада 2017</p>
                    </div>
                </div>

                <Row>

                    <Col xs={12} md={4}>
                        <i className="bi bi-star-fill me-2"></i>
                        <span>
                            35 відгуків
                        </span>
                    </Col>

                    <Col>
                        <i className="bi bi-shield-check"></i>
                        <span className="ms-2">Верифікований користувач</span>
                    </Col>

                </Row>

                <h6 className="fw-bold my-4 mb-3">Під час подорожі</h6>
                <p className={styles["fs-14"]}>Будьте на зв'язку, коли у вас виникнуть запитання</p>

                <p>Мови: English, Українська</p>
                <p>Швидкість відповіді: 100%</p>
                <p>Швидкість відповіді: протягом години</p>
                <button className={`my-4 ${styles.button}`}>
                    Зв'язатись з господарем
                </button>


                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom:'35px', marginTop: '15px' }}>
                    <i className="bi bi-house-lock" style={{ fontSize: '20px', flexShrink: 0 }}></i>
                    <p className={styles.warn}>
                        Щоб захистити свою оплату, ніколи не переказуйте кошти та не
                        спілкуйтеся за межами веб-сайту чи застосунку <strong>HomeFu.</strong>
                    </p>
                </div>

            </Col>
        </Container>


    );

}

export default PropertyOwner;