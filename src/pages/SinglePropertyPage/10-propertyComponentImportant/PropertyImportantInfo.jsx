import { Container, Col, Row } from "react-bootstrap";
import styles from './PropertyImportantInfo.module.css';
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {selectedStartDate } from './../../../store/selectors/selectDateRange'

const PropertyImportantInfo = ({ importantInfo, maxGuests, openModal }) => {
    // const startDate = useSelector(state =>
    //     state.dateRange.startDate ? new Date(state.dateRange.startDate) : null
    // );
    const startDate=useSelector(selectedStartDate)

    const cancelPolicy = importantInfo.cancelPolicy?.[0];
    const freeCancelationDays = cancelPolicy?.freeCancelationDays || 0;
    const partCancelationDays = cancelPolicy?.partCancelationDays || 0;
    const partCancelationPercent = cancelPolicy?.partCancelationPercent || 0;

    let cancelationText = "Безкоштовне скасування протягом 24 годин після бронювання";

    if (startDate) {
        const today = new Date();
        // Обнуляем время, чтобы сравнение было точным только по датам
        today.setHours(0, 0, 0, 0);
        const startDay = new Date(startDate);
        startDay.setHours(0, 0, 0, 0);

        const diffInDays = Math.floor((startDay - today) / (1000 * 60 * 60 * 24));

        const formatter = new Intl.DateTimeFormat("uk-UA", {
            day: "2-digit",
            month: "long"
        });

        if (diffInDays >= freeCancelationDays) {
            const freeCancelationDate = new Date(startDay);
            freeCancelationDate.setDate(startDay.getDate() - freeCancelationDays);
            cancelationText = `Безкоштовне скасування до ${formatter.format(freeCancelationDate)}`;
        } else if (diffInDays >= partCancelationDays) {
            cancelationText = `Скасування з поверненням ${100 - partCancelationPercent}% суми`;}
        else{
            cancelationText = "Скасування неможливе або повернення не передбачене";
        }
    }

    return (
        <Container className={styles["ff-2"]}>
            <h5 className={`ms-0 ${styles["fw-700"]} ${styles["ff-2"]}`}>Важлива інформація</h5>
            <Row className={`mt-4 ${styles["fs-12"]}`}>
                <Col xs={12} md={4}>
                    <h6 className={styles["fw-700"]}>Правила дому</h6>
                    <p>Максимальна кількість гостей: {maxGuests}</p>
                    {importantInfo.homeRules.map((rule, index) => (
                        <p key={index}>{rule.text}</p>
                    ))}
                </Col>
                <Col xs={12} md={4}>
                    <h6 className={styles["fw-700"]}>Правила безпеки в помешканні</h6>
                    {importantInfo.safetyRules.map((rule, i) => (
                        <p key={i}>{rule.label}</p>
                    ))}
                </Col>
                <Col xs={12} md={4}>
                    <h6 className={styles["fw-700"]}>Правила скасування бронювання</h6>
                    <p>{cancelationText}</p>
                    <p style={{cursor:'pointer'}} onClick={openModal}>
                        Перегляньте повні правила скасування бронювання, які застосовуються, навіть якщо ви
                        скасовуєте бронювання через хворобу або обмеження подорожей через COVID-19.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

PropertyImportantInfo.propTypes={
    importantInfo: PropTypes.object.isRequired,
    maxGuests:PropTypes.number.isRequired,
    openModal: PropTypes.func.isRequired
}

export default PropertyImportantInfo;
