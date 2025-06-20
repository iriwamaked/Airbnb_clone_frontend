import {useState} from 'react';
import IdeasForTravels from '../IdeasForTravels';
import IdeasForTravellsContent from '../IdeasForTravellsContent/IdeasForTravellsContent';
import styles from './IdeasForTravellsPage.module.css';
import LinksBlockForFooter from "../../../components/LinksBlockForFooter/LinksBlockForFooter";

function IdeasForTravellsPage(){
    const [selectedCategory, setSelectedCategory]=useState("popular");

    return(
         <div className={styles.container}>
            <h4>Ідеї для майбутні поїздок</h4>
          <IdeasForTravels onCategorySelect={setSelectedCategory}/>
          <hr className={styles.divider}/>
          <IdeasForTravellsContent ideasCategory={selectedCategory}/>
          <hr className={styles.divider}/>
          <LinksBlockForFooter/>
        </div>
    )
}

export default IdeasForTravellsPage;