import styles from './PropertyDescription.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCalendar from '../5-propertyComponentCalendar/PropertyCalendar';

const PropertyDescription = () => {
    return (
        <Container className="p-0">
            <Row className="m-0">
                <Col sm={10} className="m-0 p-0" >
                    <h4 className="m-0 p-0 pb-2" style={{ fontWeight: 600 }}>Помешкання для оренди, господар - Ілона</h4>
                    <p className={`m-0 p-0 ${styles.text}`}>
                        4 гостя, 1 спальня, 2 ліжка, 1 ванна кімната
                    </p></Col>
                <Col sm={2} className="m-0 p-0 text-end">
                    <img src="/testDataProperty/img/Owner.png" />
                </Col>
            </Row>
            <hr className={styles.divider} />
            <Row className={`m-4 ms-4 ${styles.text}`}>
                <Row>
                    <h6>Окреме робоче місце</h6>
                    <p> Зона спільного користування з Wi-Fi, яка добре підходить для роботи.</p>
                </Row>
                <Row>
                    < h6> Самостійне прибуття</h6>
                    <p>Самостійне прибуття за допомогою ключа в сейфі</p>
                </Row>
                <Row>
                    <h6 >Безкоштовне скасування бронювання до 30 грудня</h6>
                </Row>
            </Row>

            <hr className={styles.divider} />

            <Row className={styles.text}>
                <p>Деякі дані перекладено автоматично. <Link className={styles["custom-link"]}>Показати мовою оригіналу.</Link></p>
            </Row>
            <Row className={styles.text}>
                <p className="my-3">Вона оснажщена кодиційонером і безкоштовним Wi-Fi. Ви можете відпочити на затишній терасі, насолоджуючись видом на море. Квартира розміром 24 метри з
                    повністю обладнаною кухнею з мікрохвильовою пічю, вітальнею, телевізором з плоским екраном, власною ванною кімнатою з пральною машиною, феном. Є холодильник, плита, чайник.
                    Спальне місце - двоспальне ліжко. На терториії комплексу розташовані магазин, аптека, кавярня та інші сервіси, поруч...
                </p>
            </Row>
              <Row className={styles.text}>
                <Link className={`my-4 ${styles["custom-link"]}`}>Показати більше</Link>
            </Row>

            <hr className={styles.divider} />

            <Row className={`mb-4 ${styles.text}`}>
                <Link className={`my-4 ${styles["custom-link"]}`}>Місце для сну</Link>
                <Col>
                 <img className={styles.img} src="https://a0.muscache.com/im/pictures/e716e3eb-a07f-4b94-ae48-569fb8e581ba.jpg?im_w=720"/>
                </Col>
                
                <h6>Спальня</h6>
                <p>1 ліжко king-size</p>
            </Row>

            <hr className={styles.divider} />

            <Row className={styles.container}>
                <h5> Які тут зручності</h5>
                <Row className=" m-0 mb-3">
                    <Col className={styles["centered-link"]}>
                        <span className="material-symbols-outlined">fork_spoon</span>
                        <span>Кухня</span>
                    </Col>
                    <Col className={styles["centered-link"]}>
                        <span className="material-symbols-outlined">wifi</span>
                        <span>Wi-Fi</span>
                    </Col>
                </Row>
                  <Row className=" m-0 mb-3">
                    <Col className={styles["centered-link"]}>
                        <span className="material-symbols-outlined">bed</span>
                        <span>Окреме місце для сну</span>
                    </Col>
                    <Col className={styles["centered-link"]}>
                        <span className="material-symbols-outlined">tv</span>
                        <span>Телевізор</span>
                    </Col>
                </Row>
                <Row className=" m-0 mb-3">
                    <Col className={styles["centered-link"]}>
                        <span className="material-symbols-outlined">elevator</span>
                        <span>Ліфт</span>
                    </Col>
                    <Col className={styles["centered-link"]}>
                        <span className="material-symbols-outlined">local_laundry_service</span>
                        <span>Пральна та сушильна машина</span>
                    </Col>
                </Row>
                <Row className="m-0 mb-3">
                    <Col className={styles["centered-link"]}>
                        <span className="material-symbols-outlined">climate_mini_split</span>
                        <span>Портативна система кондиціонування</span>
                    </Col>
                    <Col className={styles["centered-link"]}>
                        <span className="material-symbols-outlined">oven_gen</span>
                        <span>Укомплектована кухня</span>
                    </Col>
                </Row>
                  <Row className="m-0 mb-3">
                    <Col className={styles["centered-link"]}>
                        <span className="material-symbols-outlined">self_care</span>
                        <span>Фен</span>
                    </Col>
                    <Col className={styles["centered-link"]}>
                        <span className="material-symbols-outlined">Garage</span>
                        <span>Паркінг</span>
                    </Col>
                </Row>
                <div className={`w-50 my-4 ${styles["custom-btn"]}`}>
                    Показати всі зручності (10)
                </div>

                  <hr className={`my-4 ${styles.divider}`} />

                  <PropertyCalendar/>
            </Row>
        </Container>
    );
}

export default PropertyDescription;