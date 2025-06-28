import styles from './PropertyDescription.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCalendar from '../5-propertyComponentCalendar/PropertyCalendar';
import TemporaryModal from './../../../components/TemporaryModal/TemporaryModal';
import { useState } from 'react';
import PropTypes from 'prop-types';


const PropertyDescription = ({ shortDescription, owner, ownerAvatar, maxGuestsNumber, bedroomsNumber, bedNumber, bathroomsNumber, advantages, description,
    placeForSleep, facilities, city, busyDates
}) => {
    const [showModal, setShowModal] = useState(false);

    const [showAllFacilities, setShowAllFacilities] = useState(false);

    const MAX_VISIBLE = 10;
    const visibleFacilities = showAllFacilities ? facilities : facilities.slice(0, MAX_VISIBLE);
    const hiddenCount = facilities.length - MAX_VISIBLE;

    //Разделение на левую и правую колонки удобств
    const half = Math.ceil(visibleFacilities.length / 2);
    const leftFacilities = visibleFacilities.slice(0, half);
    const rightFacilities = visibleFacilities.slice(half);


    return (
        <Container className="p-0">
            <Row className="m-0">
                <Col sm={10} className="m-0 p-0" >
                    <h4 className="m-0 p-0 pb-2" style={{ fontWeight: 600 }}>{shortDescription}, господар - {owner}</h4>
                    <p className={`m-0 p-0 ${styles.text}`}>
                        {maxGuestsNumber} гостя, {bedroomsNumber} спальня, {bedNumber} ліжка, {bathroomsNumber} ванна кімната
                    </p></Col>
                <Col sm={2} className="m-0 p-0 text-end">
                    <img src={ownerAvatar.src} alt={ownerAvatar.alt} />
                </Col>
            </Row>
            <hr className={styles.divider} />
            <Row className={`m-4 ms-4 ${styles.text}`}>
                {advantages.map((advantage, index) => (
                    <Row key={index} className="mb-2">
                        <h6>{advantage.title}</h6>
                        {advantage.description && <p>{advantage.description}</p>}
                    </Row>
                ))}
            </Row>

            <hr className={styles.divider} />

            <Row className={styles.text}>
                <p>Деякі дані перекладено автоматично.
                    <Link className={styles["custom-link"]}
                        onClick={() => setShowModal(true)}>Показати мовою оригіналу.</Link></p>
            </Row>
            <Row className={styles.text}>
                <p className="my-3">{description}
                </p>
            </Row>
            <Row className={styles.text}>
                <Link className={`my-4 ${styles["custom-link"]}`} onClick={() => setShowModal(true)}>Показати більше</Link>
            </Row>

            <hr className={styles.divider} />

            <Row className={`mb-4 ${styles.text}`}>
                <Link className={`my-4 ${styles["custom-link"]}`}>Місце для сну</Link>
                <Col>
                    {placeForSleep.length > 0 && (
                        <img className={styles.img} src={placeForSleep[0].src} alt={placeForSleep[0].alt} />
                    )}

                </Col>

                <h6>Спальня</h6>
                <p>{bedNumber} ліжко king-size</p>
            </Row>

            <hr className={styles.divider} />

            <Row className={styles.container}>
                <h5> Які тут зручності</h5>
                <Row >
                    {/* Левая колонка */}
                    <Col className={styles.column}>
                        {leftFacilities.map(({ IconName, name }, index) => (
                            <div key={index} className="d-flex align-items-center mb-3">
                                <span className="material-symbols-outlined me-2">{IconName}</span>
                                <span>{name}</span>
                            </div>
                        ))}
                    </Col>

                    {/* Правая колонка */}
                    <Col className={styles.column}>
                        {rightFacilities.map(({ IconName, name }, index) => (
                            <div key={index} className="d-flex align-items-center mb-3">
                                <span className="material-symbols-outlined me-2">{IconName}</span>
                                <span>{name}</span>
                            </div>
                        ))}
                    </Col>
                </Row>

                {!showAllFacilities && hiddenCount > 0 && (
                    <div
                        className={`w-50 my-4 ${styles["custom-btn"]}`}
                        onClick={() => setShowAllFacilities(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        Показати всі зручності ({hiddenCount})
                    </div>
                )}
            </Row>
            <hr className={`my-4 ${styles.divider}`} />

            <PropertyCalendar city={city} busyDates={busyDates}/>

            <TemporaryModal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="Компонент в стадії розробки!"
                message="Спробуйте знову пізніше"
            />
        </Container>
    );
}

PropertyDescription.propTypes = {
    shortDescription: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    ownerAvatar: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }).isRequired,
    maxGuestsNumber: PropTypes.number.isRequired,
    bedroomsNumber: PropTypes.number.isRequired,
    bedNumber: PropTypes.number.isRequired,
    bathroomsNumber: PropTypes.number.isRequired,
    advantages: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    ).isRequired,
    description: PropTypes.string.isRequired,
    placeForSleep: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        })
    ).isRequired,
    facilities: PropTypes.arrayOf(
        PropTypes.shape({
            IconName: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    city: PropTypes.string.isRequired,
    busyDates:PropTypes.arrayOf(
        PropTypes.shape(
            {
                from: PropTypes.string.isRequired,
                to: PropTypes.string.isRequired
            }
        )
    )
    
};

export default PropertyDescription;