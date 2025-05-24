import { Container } from "react-bootstrap";
import styles from "./PropertyLocation.module.css";
import { Link } from "react-router-dom";
import GoogleMap from "../../../components/GoogleMapComponent/GoggleMap";


const PropertyLocation=()=>{
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    return(
        <Container className={`my-5 ${styles["ff-2"]}`}>
            <h5 className={`mb-4 ${styles["fw-700"]}`}>Де ви будете</h5>
            <GoogleMap />
            <p>Одеса, Одеська область, Україна</p>
            <p>перша лінія біля моря, Аркадія, Французький бульвар</p>
            <Link>Показати більше <code>&gt;</code> </Link>

             <iframe
      title="Карта квартиры"
      width="600"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Одесса+ул+Пушкинская+10`}>
    </iframe>
        </Container>
        
    );
}

export default PropertyLocation;