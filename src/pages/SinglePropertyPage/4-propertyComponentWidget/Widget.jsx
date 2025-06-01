import styles from './Widget.module.css';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import { setDateRange, clearDateRange } from '../../../store/slices/dataRangeSlice';
import { useMemo } from 'react';

const Widget = ({ rating, reviewsNumber, pricePerNight, priceForAddedServices, busyDates }) => {

    const startDateRaw = useSelector(state => state.dateRange.startDate);
    const endDateRaw = useSelector(state => state.dateRange.endDate);

    const startDate = startDateRaw ? new Date(startDateRaw) : null;
    const endDate = endDateRaw ? new Date(endDateRaw) : null;

    const formattedStart = startDate ? startDate.toLocaleDateString('uk-UA') : "Дата не обрана";
    const formattedEnd = endDate ? endDate.toLocaleDateString('uk-UA') : "Дата не обрана";

    const dispatch = useDispatch();

    const nightsCount = useMemo(() => {
        if (!startDate || !endDate) return 0;
        return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    }, [startDate, endDate]);


    const busyRanges = useMemo(() => {
        if (!Array.isArray(busyDates)) return [];
        return busyDates.map(range => ({
            start: new Date(range.from),
            end: new Date(range.to)
        }));
    }, [busyDates]);

    const [showCalendar, setShowCalendar] = useState(false);
    const [activeField, setActiveField] = useState(null);

    const openCalendar = (field) => {
        setActiveField(field);
        setShowCalendar(true);
    }

    const closeCalendar = () => setShowCalendar(false);

    const handleChange = (dates) => {
        const [start, end] = dates;
        const serialized = [start ? start.toISOString() : null, end ? end.toISOString() : null];
        dispatch(setDateRange(serialized));
    }

    const clearDates = () => {
        // 
        dispatch(clearDateRange());
    }


    return (
        <div className={styles["widget-container"]}>
            <div className={styles["custom-row"]}>
                <span><span className={styles["custom-weight"]}>$ {pricePerNight}</span> ніч</span>
                <span className={styles["right-block"]}>
                    <span>
                        <i className="bi bi-star-fill me-2"></i>
                        {rating}
                    </span>
                    <span className={styles['dot-divider']}></span>
                    <span>
                        <span className={styles["underline-text"]}> {reviewsNumber} відгуків</span>
                    </span>
                </span>
            </div>
            {/* Даты, количество гостей */}
            <Container className={styles["second-container"]}>
                <Row className={`${styles["row-border"]}`}>
                    <Col className={`${styles["col-border"]} ${styles["col"]}`}
                        onClick={() => openCalendar('start')}
                    >
                        <div>ПРИБУТТЯ</div>
                        <div className={styles.date}>{formattedStart}</div>
                    </Col>
                    <Col className={styles["col"]}
                        onClick={() => openCalendar('end')}
                    >
                        <div>ВИЇЗД</div>
                        <div className={styles.date}>{formattedEnd}</div>
                    </Col>
                </Row>
                <Row>
                    <div className={styles.row}>ГОСТІ</div>
                    <div style={{ fontWeight: 400, padding: "0px 15px 15px 15px" }}>1 гість</div>
                </Row>
            </Container>

            <button className={styles.button}>
                Забронювати
            </button>

            <p className={`${styles["text"]} ${styles["text-first"]}`}>Поки що ви нічого не платите</p>
            <p className={`${styles["text"]} ${styles["text-second"]}`}>
                <span className={styles["underline-text-2"]}>$63 x 5 ночей</span>
                <span>$ 315</span>
            </p>
            <p className={`${styles["text"]} ${styles["text-second"]}`}>
                <span className={styles["underline-text-2"]}>Плата за прибирання</span>
                <span>$20</span>
            </p>
            <hr className={styles.divider} />
            <p className={`${styles["text"]} ${styles["text-second"]} ${styles["weight-700"]}`}>
                <span>Усього до сплати податків</span>
                <span>$335</span>
            </p>

            {/*Календарь справа зверху*/}
            {showCalendar && (
                <div
                    className={styles["calendar-popup"]}

                >
                    <Row className='m-2'>
                        <Col className={styles["row-popupp-ff"]}>
                            <h4 className="m-0 p-0 mb-2">
                                {nightsCount === 0 ? "" : `${nightsCount} `}
                                {nightsCount === 0 ? "" : nightsCount === 1 ? "ніч" : nightsCount >= 2 && nightsCount <= 4 ? "ночі" : "ночей"}
                            </h4>

                 <Row className={`g-0 ${styles["row-popup-ff"]}`}>

                             <Col>
                                {startDate ? startDate.toLocaleDateString("uk-UA",
                                    {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }) : ""}

                           </Col>
                            <Col>
                                {endDate ? endDate.toLocaleDateString("uk-UA",
                                    {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }) : ""}
                           </Col>
                           </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col className={`${styles["col-border-full-left"]} ${styles["col2"]}`} >
                                    <label>Прибуття</label>
                                    <div className={styles.date}>{formattedStart}</div>
                                </Col>
                                <Col className={`${styles["col-border-full-right"]} ${styles["col2"]}`} >
                                    <label>Виїзд</label>
                                    <div className={styles.date}>{formattedEnd}</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <CustomDatePicker
                        startDate={startDate}
                        endDate={endDate}
                        onChange={handleChange}
                        autoFocusField={activeField}
                        disabledPast={true}
                        busyRanges={busyRanges}
                    />
                    <div className={styles["end-block"]}>
                        <i className="bi bi-keyboard fs-4"></i>
                        <div>
                            <span className={styles["underline"]} onClick={clearDates}>Очистити дати </span>

                            <button

                                onClick={closeCalendar}
                                className={styles["close-calendar-button"]}  >
                                Закрити
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

Widget.propTypes = {
    rating: PropTypes.number.isRequired,
    reviewsNumber: PropTypes.number.isRequired,
    pricePerNight: PropTypes.number.isRequired,
    priceForAddedServices: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            forcibly: PropTypes.bool.isRequired,
            price: PropTypes.number.isRequired
        })
    ).isRequired,
    busyDates: PropTypes.arrayOf(
        PropTypes.shape(
            {
                from: PropTypes.string.isRequired,
                to: PropTypes.string.isRequired
            }
        )
    )
};

export default Widget;