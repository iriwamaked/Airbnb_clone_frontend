import styles from './PropertyImagesComponent.module.css'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap'

const PropertyImagesComponent = () => {
    return (
        <Row className={styles["container-limited"]}>
            <Col xs={12} md={6}>
                <img className="w-100 h-100 object-fit-cover rounded-4"
                    src="https://a0.muscache.com/im/pictures/0a159d56-b424-4a61-a319-4f968e356974.jpg?im_w=1200" />
            </Col>
            <Col xs={12} md={6}>
                <Row className="h-50 mb-1">
                    <Col className="w-50">
                        <img className="w-100 h-100 object-fit-cover rounded-4"
                            src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTU3NDMzODg5OTI4MDYzODYw/original/95cd745b-97c6-44a3-9e0f-4a4505694670.jpeg?im_w=720" />
                    </Col>
                    <Col className="w-50 ps-0">
                        <img className="w-100 h-100 object-fit-cover rounded-4"
                            src="https://a0.muscache.com/im/pictures/a216b740-2a26-4683-b79c-fae9fb585204.jpg?im_w=720" />
                    </Col>
                </Row>
                <Row className="h-50 mt-2">
                    <Col className="w-50 mb-2">
                        <img className="w-100 h-100 object-fit-cover rounded-4"
                            src="https://a0.muscache.com/im/pictures/73a7cef6-3664-4966-a878-893e1df13c63.jpg?im_w=720" />
                    </Col>
                    <Col className="w-50 ps-0 mb-2">
                        <img className="w-100 h-100 object-fit-cover rounded-4"
                            src="https://a0.muscache.com/im/pictures/3269baa6-07cd-4901-a52e-9d43904fb86c.jpg?im_w=720" />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default PropertyImagesComponent;