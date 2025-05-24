import { Container } from "react-bootstrap";
import styles from "./PropertyLocation.module.css";
import { Link } from "react-router-dom";

const PropertyLocation=()=>{
    return(
        <Container className={`my-5 ${styles["ff-2"]}`}>
            <h5 className={`mb-4 ${styles["fw-700"]}`}>Де ви будете</h5>
            <div>
                
            </div>
            <p>Одеса, Одеська область, Україна</p>
            <p>перша лінія біля моря, Аркадія, Французький бульвар</p>
            <Link>Показати більше <code>&gt;</code> </Link>
        </Container>
        
    );
}

export default PropertyLocation;