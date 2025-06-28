import { Container, Col, Row } from "react-bootstrap";
import styles from './PropertyImportantInfo.module.css';
const PropertyImportantInfo=()=>{
    return(
        <Container className={styles["ff-2"]}>
            <h5 className={`ms-0 ${styles["fw-700"]} ${styles["ff-2"]}`}>Важлива інформація</h5>
          <Row className={`mt-4 ${styles["fs-12"]}`}>
              <Col>
                <h6 className={styles["fw-700"]}>Правила дому</h6>
                <p className={styles["fs-12"]}>Прибуття: після 13:00</p>
                <p>Виїзд: після 10:00</p>
                <p>Максимальна кількість гостей: 4</p>
            </Col>
            <Col>
                <h6 className={styles["fw-700"]}>Правила безпеки в помешканні</h6>
                <p>Датчик диму</p>
                <p>Датчик чадного газу</p>
            </Col>
               <Col>
                <h6 className={styles["fw-700"]}>Правила скасування бронювання</h6>
                <p>Безкоштовне скасування бронювання до 30 грудня</p>
                <p>Перегляньте повні правила скасування бронювання, які застосовуються, навіть якщо ви 
                    скасовуєте бронювання через хворобу або обмеження подорожей через COVID-19.
                </p>
                
            </Col>
          </Row>
        </Container>
    )
}

export default PropertyImportantInfo;