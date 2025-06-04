import styles from './Widget.module.css';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import { setDateRange, clearDateRange } from '../../../store/slices/dataRangeSlice';
import { useMemo } from 'react';
import GuestSelector from '../../../components/GuestsSelector/GuestSelector';


const Widget = ({ rating, reviewsNumber, pricePerNight, priceForAddedServices, busyDates, maxGuests, petsAllowed, maxPets, petsAddedPrice, openModal}) => {

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

    const nights = nightsCount === 0 ? ""
        : nightsCount === 1 ? " ніч"
            : (nightsCount >= 2 && nightsCount <= 4) ? " ночі"
                : " ночей";

    const busyRanges = useMemo(() => {
        if (!Array.isArray(busyDates)) return [];
        return busyDates.map(range => ({
            start: new Date(range.from),
            end: new Date(range.to)
        }));
    }, [busyDates]);



    const totalAddedServicesPrice = useMemo(() => {
        if (!Array.isArray(priceForAddedServices)) return 0;
        return priceForAddedServices.reduce((sum, service) => sum + service.price, 0);
    }, [priceForAddedServices]);



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
        if (start && end) {
            setTimeout(() => {
                closeCalendar() // закрываем календарь, если обе даты выбраны
            }, 1000)
        }
    };

    const clearDates = () => {
        // 
        dispatch(clearDateRange());
    }

    const [showGuests, setShowGuests] = useState(false);

    const guests = useSelector(state => state.guests);
    const { adults = 0, children = 0, infants = 0, pets = 0 } = guests || {};
    const totalGuests = adults + children;
    let guestLabel = totalGuests === 0 ? "Додати гостей" : `${totalGuests} ${totalGuests === 1 ? "гість" : "гостей"}`

    if (infants > 0) {
        guestLabel += `, ${infants} ${infants === 1 ? "немовля" : "немовлят"}`;
    }

    // Додаємо тварин, якщо є
    if (pets > 0) {
        guestLabel += `, ${pets} ${pets === 1 ? "тварина" : "тварини"}`;
    }

    const totalPetsAddedPrice = pets * petsAddedPrice;

    const totalPricePerNight = (pricePerNight * nightsCount) + totalAddedServicesPrice + totalPetsAddedPrice;
    // console.log(maxPets);
    return (
        <div className={styles["widget-container"]}>
            <div className={styles["custom-row"]}>
                <span className={styles["custom-weight"]}>
                    $
                    {nightsCount === 0
                        ? `${pricePerNight} ніч`
                        : `${totalPricePerNight}`}
                </span>
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
                        onClick={() => openCalendar('end')}  >
                        <div>ВИЇЗД</div>
                        <div className={styles.date}>{formattedEnd}</div>
                    </Col>
                </Row>
                <Row onClick={(e) => { e.stopPropagation(); setShowGuests(true); }}>
                    <div className={styles.row}>ГОСТІ</div>
                    <div style={{
                        fontWeight: 400,
                        padding: "0px 15px 15px 15px",
                        cursor: "pointer",
                        position: "relative"
                    }}

                        >
                        {guestLabel}
                        {showGuests && (
                            <GuestSelector maxGuests={maxGuests} petsAllowed={petsAllowed} maxPets={maxPets}
                                onClose={() => { setShowGuests(false); }} />
                        )}

                    </div>
                </Row>
            </Container>
           
            <button className={styles.button} onClick={openModal}>
                Забронювати
            </button>

            <p className={`${styles["text"]} ${styles["text-first"]}`}>Поки що ви нічого не платите</p>
            {nightsCount > 0 ? (<>
                <p className={`${styles["text"]} ${styles["text-second"]}`}>

                    <span className={styles["underline-text-2"]}>${pricePerNight} x {nightsCount} {nights}</span>
                    <span>$ {pricePerNight * nightsCount}</span>
                </p>
                {/* {console.log({ priceForAddedServices })} */}
                {Array.isArray(priceForAddedServices) && priceForAddedServices.length > 0 && priceForAddedServices.map((service, index) => (
                    <p key={index} className={`${styles["text"]} ${styles["text-second"]}`}>
                        <span className={styles["underline-text-2"]}>{service.name}</span>
                        <span>$ {service.price}</span>
                    </p>
                ))}
                {petsAllowed && pets > 0 && (
                    <p className={`${styles["text"]} ${styles["text-second"]}`}>
                        <span className={styles["underline-text-2"]}> Плата за розміщення  тварин <small>{pets} х {petsAddedPrice}</small></span> <span>$ {totalPetsAddedPrice}</span>
                    </p>
                )}

                <hr className={styles.divider} />
                <p className={`${styles["text"]} ${styles["text-second"]} ${styles["weight-700"]}`}>
                    <span>Усього до сплати: </span>
                    <span>$ {totalPricePerNight}</span>
                </p>
            </>) : (<span>Оберіть дати для розрахунку вартості</span>)}
            {/*Календарь справа зверху*/}
            {showCalendar && (
                <div
                    className={styles["calendar-popup"]}>
                    <Row className='m-2'>
                        <Col className={styles["row-popupp-ff"]}>
                            <h4 className="m-0 p-0 mb-2">
                                {nightsCount === 0 ? "Виберіть дати" : `${nightsCount} `}
                                {nights}
                            </h4>

                            <Row className={`g-0 ${styles["row-popup-ff"]}`}>

                                {startDate ?
                                    (<><Col>
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
                                        </Col></>) : ("Щоб переглянути точну ціну, вкажіть дати подорожі")}
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col
                                    className={`${styles["col-border-full-left"]} ${styles["col2"]} ${!startDate
                                        ? styles["highlight-block"]
                                        : endDate
                                            ? ""
                                            : "border-end-0"
                                        }`}
                                >
                                    <label>Прибуття</label>
                                    <div className={styles.date}>{formattedStart}</div>
                                </Col>
                                <Col
                                    className={`${styles["col-border-full-right"]} ${styles["col2"]} ${startDate && !endDate
                                        ? styles["highlight-block"]
                                        : startDate && endDate
                                            ? ""
                                            : "border-start-1"
                                        }`}
                                >
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
    ),
    busyDates: PropTypes.arrayOf(
        PropTypes.shape(
            {
                from: PropTypes.string.isRequired,
                to: PropTypes.string.isRequired
            }
        )
    ),
    maxGuests: PropTypes.number.isRequired,
    petsAllowed: PropTypes.bool,
    maxPets: PropTypes.number,
    petsAddedPrice: PropTypes.number,
    openModal: PropTypes.func.isRequired
};

export default Widget;