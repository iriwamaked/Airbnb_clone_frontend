import styles from './SinglePropertyPage.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import FirstPropertyComponent from './1-propertyComponent/FirstPropertyComponent';
import PropertyImagesComponent from './2-propertyImages/PropertyImagesComponent';

import Widget from './4-propertyComponentWidget/Widget';
import PropertyDescription from './3-propertyComponent/PropertyDescription';
import PropertyRating from './6-propertyComponentRaiting/PropertyRaiting';
import PropertyReview from './7-propertyComponentReview/PropertyReview';
import PropertyLocation from './8-propertyComponentLocation/PropertyLocation';
import PropertyOwner from './9-propertyComponentOwner/PropertyOwner';
import PropertyImportantInfo from './10-propertyComponentImportant/PropertyImportantInfo';
import { useEffect, useState } from 'react';

import { Spinner } from 'react-bootstrap';
import TemporaryModal from '../../components/TemporaryModal/TemporaryModal';


const SinglePropertyPage = () => {
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: 'Приносимо вибачення',
        message: 'Компонент в стадії розробки',
    });

    const openModal = () => {
        // setModalContent({ title, message });
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/testDataProperty/property.json');
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setProperty(data.data.attributes);
            } catch (err) {
                console.error('Ошибка загрузки данных:', err);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center gap-3" style={{ minHeight: '300px' }}>
                <Spinner animation="border" variant="secondary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </Spinner>
                <Spinner animation="border" variant="secondary" role="status">
                </Spinner>
                <Spinner animation="border" variant="secondary" role="status">
                </Spinner>
            </div>
        );
    }
    if (!property) return <div className="d-flex justify-content-center align-items-center">Помилка завантаження данних</div>

    const fullUrl = `https://localhost:5173/property/${property.id}`;

    return (
        <div className={styles.container}>
            <Helmet>
                <title>{property.title} - Оголошення</title>
                <meta property="og:title" content={property.title} />
                <meta property="og:description" content={
                    property?.location && property?.shortdescription
                        ? `Уютное жильё в ${property.location}. ${property.shortdescription}`
                        : 'Оголошення про житло'
                } />
                <meta property="og:image" content={property.images?.[0]?.src || ''} />
                <meta property="og:url" content={fullUrl} />
                <meta property="og:type" content="website" />
            </Helmet>

            <FirstPropertyComponent
                title={property.title}
                rating={property.rating}
                reviewsNumber={property.reviewsNumber}
                location={`${property.city}, ${property.region}, ${property.country}`}
                imageUrl={property.images[0].src}
                shortDescription={property.shortDescription}
            />
            <PropertyImagesComponent images={property.images} />
            <Container className="p-0 mt-5">
                <Row className={styles.testFloatingBlock}>
                    <Col md={6} lg={7}>
                        <PropertyDescription
                            shortDescription={property.shortDescription}
                            owner={property.owner.name}
                            ownerAvatar={property.owner.avatar}
                            maxGuestsNumber={property.guestsRules.maxGuestsNumber}
                            bedroomsNumber={property.bedroomsNumber}
                            bedNumber={property.bedNumber}
                            bathroomsNumber={property.bathroomsNumber}
                            advantages={property.advantages}
                            description={property.description}
                            placeForSleep={property.placeForSleep}
                            facilities={property.facilities}
                            city={property.city}
                            busyDates={property.booked_dates}
                            pricePerNight={property.pricePerNight}
                            priceForAddedServices={property.priceForAddedServices}
                        /></Col>
                    <Col md={6} lg={5}>
                        <Widget rating={property.rating}
                            title={property.title}
  image={property.images[0]?.src || ""} // ✅ только строка — сам URL
                            reviewsNumber={property.reviewsNumber}
                            busyDates={property.booked_dates}
                            pricePerNight={property.pricePerNight}
                            priceForAddedServices={property.priceForAddServices}
                            maxGuests={property.guestsRules.maxGuestsNumber}
                            petsAllowed={property.guestsRules.petsAllowed}
                            maxPets={property.guestsRules.maxPetsNumber}
                            petsAddedPrice={property.guestsRules.petsAddedPrice}
                            openModal={openModal} />
                    </Col>
                </Row>
            </Container>
         
            <hr className={`my-3 mb-5 ${styles.divider}`} />

            <PropertyRating
                rating={property.rating}
                reviewsNumber={property.reviewsNumber}
                ratingCriterias={property.ratingCriterias}
            />

            <PropertyReview comments={property.comments} openModal={openModal} />

            <PropertyLocation coords={property.locationCoords}
                location={`${property.city}, ${property.region}, ${property.country}`}
                locationDescription={property.locationDescription}
                openModal={openModal}/>

            <PropertyOwner owner={property.owner} openModal={openModal} />

            <hr className={`my-3 ${styles.divider}`} />

            <PropertyImportantInfo importantInfo={property.importantInfo}
                maxGuests={property.guestsRules.maxGuestsNumber}
                openModal={openModal} />

            <TemporaryModal
                show={showModal}
                onClose={closeModal}
                title={modalContent.title}
                message={modalContent.message}
            />
        </div>
    )
}

export default SinglePropertyPage;