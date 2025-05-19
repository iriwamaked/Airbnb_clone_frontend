import styles from './OnePropertyPage.module.css';
import {Container, Row, Col} from 'react-bootstrap';

import FirstPropertyComponent from './1-propertyComponent/FirstPropertyComponent';
import PropertyImagesComponent from './2-propertyImages/PropertyImagesComponent';

import Widget from './4-propertyComponentWidget/Widget';
import PropertyDescription from './3-propertyComponent/PropertyDescription';



const OnePropertyPage = ()=>{
    return(
        <div className={styles.container}>
            <FirstPropertyComponent/>
            <PropertyImagesComponent/>
            <Container className="p-0 mt-5">
                <Row className={styles.testFloatingBlock}>
                    <Col sm={7}><PropertyDescription/></Col>
                    <Col sm={5}><Widget/></Col>
                </Row>
            </Container>
            {/* <div className={styles.testFloatingBlock}>
                <PropertyDescription/>
                <Widget/>
            </div> */}
            
        </div>
    )
}

export default OnePropertyPage;