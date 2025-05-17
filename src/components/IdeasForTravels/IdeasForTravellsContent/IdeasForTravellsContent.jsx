// import styles from "./IdeasForTravellsContens.module.css";
import { useEffect,useState } from "react";
import PropTypes from 'prop-types';

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
        <div style={{ marginTop: '1rem' }}>
      <h4>Результати для: {ideasCategory}</h4>
      <ul>
        {items.map(item => (
          <li key={item.name}>{item.name} {item.description}</li>
        ))}
      </ul>
    </div>
    );
}

IdeasForTravellsContent.PropTypes={
  ideasCategory: PropTypes.string.isRequired
}

export default IdeasForTravellsContent;

