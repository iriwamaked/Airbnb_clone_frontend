import styles from './OnePropertyPage.module.css';
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



const OnePropertyPage = () => {
    return (
        <div className={styles.container}>
            <FirstPropertyComponent />
            <PropertyImagesComponent />
            <Container className="p-0 mt-5">
                <Row className={styles.testFloatingBlock}>
                    <Col md={6} lg={7}><PropertyDescription /></Col>
                    <Col md={6} lg={5}><Widget /></Col>
                </Row>
            </Container>
            {/* <div className={styles.testFloatingBlock}>
                <PropertyDescription/>
                <Widget/>
            </div> */}
            <hr className={`my-3 mb-5 ${styles.divider}`} />
            <PropertyRating />

            {/* <hr className={`my-3 ${styles.divider}`} /> */}

            <PropertyReview />
            <PropertyLocation />


            <PropertyOwner />
            <hr className={`my-3 ${styles.divider}`} />
            <PropertyImportantInfo/>
        </div>
    )
}

export default OnePropertyPage;