import styles from './SinglePropertyPage.module.css';
import { Container, Row, Col } from 'react-bootstrap';

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


const SinglePropertyPage = () => {
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

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
    if (!property) return <div className="d-flex justify-content-center align-items-center" >Помилка завантаження данних</div>

        // console.log(property.maxPetsNumber);
    return (
        <div className={styles.container}>
            <FirstPropertyComponent
                title={property.title}

                rating={property.rating}
                reviewsNumber={property.reviewsNumber}
                location={`${property.city}, ${property.region}, ${property.country}`}

            />
            <PropertyImagesComponent images={property.images} />
            <Container className="p-0 mt-5">
                <Row className={styles.testFloatingBlock}>
                    <Col md={6} lg={7}>
                        <PropertyDescription
                            shortDescription={property.shortDescription}
                            owner={property.owner}
                            ownerAvatar={property.ownerAvatar}
                            maxGuestsNumber={property.maxGuestsNumber}
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
                             reviewsNumber={property.reviewsNumber} 
                             busyDates={property.booked_dates}
                            pricePerNight={property.pricePerNight} 
                            priceForAddedServices={property.priceForAddServices} 
                            maxGuests={property.maxGuestsNumber}
                            petsAllowed={property.petsAllowed}
                            maxPets={property.maxPetsNumber}
                            petsAddedPrice={property.petsAddedPrice}/>
                    </Col>
                </Row>
            </Container>
            {/* <div className={styles.testFloatingBlock}>
                <PropertyDescription/>
                <Widget/>
            </div> */}
            <hr className={`my-3 mb-5 ${styles.divider}`} />
            <PropertyRating 
                 rating={property.rating}
                 reviewsNumber={property.reviewsNumber}
                 ratingCriterias={property.ratingCriterias}
                />

            {/* <hr className={`my-3 ${styles.divider}`} /> */}

            <PropertyReview />
            <PropertyLocation />

            <PropertyOwner />
            <hr className={`my-3 ${styles.divider}`} />
            <PropertyImportantInfo />
        </div>
    )
}

export default SinglePropertyPage;