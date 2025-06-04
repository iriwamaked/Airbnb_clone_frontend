import { Container, Col, Row } from "react-bootstrap";
import styles from "./PropertyOwner.module.css";
import PropTypes from "prop-types";

const PropertyOwner = ({ owner, openModal }) => {

    // Преобразуем дату регистрации
    const registrationDate = new Date(owner.registrationDate);
    const formattedDate = new Intl.DateTimeFormat('uk-UA', {
        year: 'numeric',
        month: 'long'
    }).format(registrationDate);

    return (

        <Container className={styles["ff-2"]}>
            <Col xs={12} md={5}>
                <div className={styles.ownerRow}>
                    <div>
                        <img src={owner.avatar.src} alt={owner.avatar.alt} />
                    </div>
                    <div className="mt-3">
                        <h5 className="fw-bold mb-6">Господар: {owner.name}</h5>
                        <p style={{ color: '#6F6558' }}>На HomeFu з {formattedDate}</p>
                    </div>
                </div>

                <Row>

                    <Col xs={12} md={4}>
                        <i className="bi bi-star-fill me-2"></i>
                        <span>
                            {owner.reviewsNumber} відгуків
                        </span>
                    </Col>

                    <Col>
                        {owner.isVerificated ? (
                            <>
                                <i className="bi bi-shield-check"></i>
                                <span className="ms-2">Верифікований користувач</span>
                            </>
                        ) : (
                            <span className="text-danger">Не верифікований користувач</span>
                        )}
                    </Col>

                </Row>

                <h6 className="fw-bold my-4 mb-3">Під час подорожі</h6>
                <p className={styles["fs-14"]}>Будьте на зв&apos;язку, коли у вас виникнуть запитання</p>

                <p>Мови: {""}
                        {owner.languages.map((lang,index)=>(
                            <span key={index}> 
                                {lang} 
                                {index<owner.languages.length-1?", ":""}</span>
                        ))}
                </p>
                <p>Швидкість відповіді: {owner.responseSpeed} %</p>
                <p>Швидкість відповіді: {owner.responseSpeedDuration}</p>
                <button className={`my-4 ${styles.button}`} onClick={openModal}>
                    Зв&apos;язатись з господарем
                </button>


                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '35px', marginTop: '15px' }}>
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

PropertyOwner.propTypes={
    owner: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired
}

export default PropertyOwner;