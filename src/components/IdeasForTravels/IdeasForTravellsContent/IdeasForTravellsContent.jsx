// import styles from "./IdeasForTravellsContens.module.css";
import { useEffect,useState } from "react";
import PropTypes from 'prop-types';
import styles from './IdeasForTravellsContent.module.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function IdeasForTravellsContent({ideasCategory}){
    const [items, setItems]= useState([]);
    useEffect(()=>{
        if(!ideasCategory) return;

        fetch(`/testData/${ideasCategory}.json`)
            .then(res=>res.json())
            .then(data=>setItems(data.items))
            .catch(err=>console.error(err));
    },[ideasCategory]);

    return(
      <Container className={styles.container}>
        <Row xs={2} md={4} lg={6}>
        {items.map(item=>(
          
            <Col key={item.name}
                 >
                <h5 className={styles.h5}>{item.name}</h5>
                <p className={styles.p}>{item.description}</p>
            </Col>
          
        ))}
        </Row>
      </Container>
    );
}

IdeasForTravellsContent.propTypes={
  ideasCategory: PropTypes.string.isRequired
}

export default IdeasForTravellsContent;

