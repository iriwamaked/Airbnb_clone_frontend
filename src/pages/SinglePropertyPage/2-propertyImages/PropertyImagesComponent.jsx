import styles from './PropertyImagesComponent.module.css'
import { Row, Col } from 'react-bootstrap'

const PropertyImagesComponent = ({ images }) => {
    if (!images || images.length < 5) {
        return <p>Недостатньо зображень для відображення.</p>;
    }

    return (
        <Row className={styles["container-limited"]}>
            <Col xs={12} md={6}>
                <img
                    className="w-100 h-100 object-fit-cover rounded-4"
                    src={images[0].src}
                    alt={images[0].alt}
                />
            </Col>

            <Col xs={12} md={6}>
                {[1, 3].map((startIndex, rowIdx) => (
                    <Row
                        key={rowIdx}
                        className={`h-50 ${rowIdx === 0 ? 'mb-1' : 'mt-2'}`}
                    >
                        {[0, 1].map((colIdx) => {
                            const img = images[startIndex + colIdx];
                            return (
                                <Col
                                    key={startIndex + colIdx}
                                    className={`w-50 ${colIdx === 1 ? 'ps-0' : ''} ${rowIdx === 1 ? 'mb-2' : ''}`}
                                >
                                    <img
                                        className="w-100 h-100 object-fit-cover rounded-4"
                                        src={img.src}
                                        alt={img.alt}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                ))}
            </Col>
        </Row>
    );
};

export default PropertyImagesComponent;



// import styles from './PropertyImagesComponent.module.css'
// import { Row } from 'react-bootstrap';
// import { Col } from 'react-bootstrap'

// const PropertyImagesComponent = ({images}) => {
//     if (!images||images.length<5){
//         return <p>Недостатньо зображень для відображення</p>
//     }

//     return (
//         <Row className={styles["container-limited"]}>
//             <Col xs={12} md={6}>
//                 <img className="w-100 h-100 object-fit-cover rounded-4"
//                     src={images[0]} />
//             </Col>
//             <Col xs={12} md={6}>
//                 <Row className="h-50 mb-1">
//                     <Col className="w-50">
//                         <img className="w-100 h-100 object-fit-cover rounded-4"
//                             src={images[1]} />
//                     </Col>
//                     <Col className="w-50 ps-0">
//                         <img className="w-100 h-100 object-fit-cover rounded-4"
//                             src={images[2]}  />
//                     </Col>
//                 </Row>
//                 <Row className="h-50 mt-2">
//                     <Col className="w-50 mb-2">
//                         <img className="w-100 h-100 object-fit-cover rounded-4"
//                             src={images[3]}  />
//                     </Col>
//                     <Col className="w-50 ps-0 mb-2">
//                         <img className="w-100 h-100 object-fit-cover rounded-4"
//                             src={images[4]} />
//                     </Col>
//                 </Row>
//             </Col>
//         </Row>
//     );
// }

// export default PropertyImagesComponent;