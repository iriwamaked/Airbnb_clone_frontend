import styles from './Widget.module.css';
import { Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import{Container} from 'react-bootstrap';

const Widget = () => {
    return (
        <div className={styles["widget-container"]}>
            <div className={styles["custom-row"]}>
                <span><span className={styles["custom-weight"]}>$63</span> ніч</span>
                <span className={styles["right-block"]}>
                    <span>
                    <i className="bi bi-star-fill me-2"></i>
                    4,95
                </span>
                <span className={styles['dot-divider']}></span>
                <span>
                   <span className={styles["underline-text"]}> 35 відгуків</span>
                </span>
                </span>
            </div>
            {/* <div className={styles["second-container"]}> */}
            <Container className={styles["second-container"]}>
               <Row className={`${styles["row-border"]}`}>
                    <Col className={`${styles["col-border"]} ${styles["col"]}`}>
                        <div>ПРИБУТТЯ</div>
                        <div style={{ fontWeight: 400 }}>04.01.2024</div>
                    </Col>
                    <Col className={styles["col"]}>
                        <div>ВИЇЗД</div>
                        <div style={{ fontWeight: 400 }}>09.01.2024</div>
                    </Col>
               </Row>
               <Row>
                    <div className={styles.row}>ГОСТІ</div>
                    <div style={{ fontWeight: 400, padding: "0px 15px 15px 15px" }}>1 гість</div>
               </Row>
               </Container>
            {/* </div> */}

            <button className={styles.button}>
                Забронювати
            </button>
        </div>
    );
}

export default Widget;