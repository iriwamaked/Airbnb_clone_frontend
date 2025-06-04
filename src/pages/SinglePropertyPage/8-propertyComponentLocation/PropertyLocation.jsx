import { Container } from "react-bootstrap";
import styles from "./PropertyLocation.module.css";
import GoogleMap from "../../../components/GoogleMapComponent/GoggleMap";
import PropTypes from "prop-types";

const PropertyLocation=({coords, location, locationDescription, openModal})=>{
    return(
        <Container className={`my-5 ${styles["ff-2"]}`}>
            <h5 className={`mb-4 ${styles["fw-700"]}`}>Де ви будете</h5>
            <GoogleMap lat={coords.latitude} lng={coords.longitude}/>
            <p className="ms-2 mt-4 fw-bold">{location}</p>
            <p className="ms-2 mb-4">{locationDescription}</p>
            <span className={`ms-2 ${styles["custom-link"]}`} onClick={openModal}>Показати більше <code>&gt;</code> </span>

             {/* <iframe
      title="Карта квартиры"
      width="600"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Одесса+ул+Пушкинская+10`}>
    </iframe> */}
        </Container>
        
    );
}

PropertyLocation.propTypes={
    coords: PropTypes.object.isRequired,
    location: PropTypes.string.isRequired,
    locationDescription: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
}

export default PropertyLocation;