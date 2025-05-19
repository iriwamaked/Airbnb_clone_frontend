import styles from './PropertyDescription.module.css';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

const PropertyDescription =()=>{
    return(
        <Container className="p-0">
            <Row className="m-0">
                <h4 className="m-0 p-0 pb-2" style={{fontWeight: 600}}>Помешкання для оренди, господар - Ілона</h4>
                <p className={`m-0 p-0 ${styles.text}`}>
                    4 гостя, 1 спальня, 2 ліжка, 1 ванна кімната
                </p>
            </Row>
            <hr className={styles.divider}/>
        </Container>
    );
}

export default PropertyDescription;