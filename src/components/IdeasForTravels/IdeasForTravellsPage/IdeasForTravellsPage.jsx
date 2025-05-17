import {useState} from 'react';
import IdeasForTravels from '../IdeasForTravels';
import IdeasForTravellsContent from '../IdeasForTravellsContent/IdeasForTravellsContent';
import { Container } from 'react-bootstrap';

function IdeasForTravellsPage(){
    const [selectedCategory, setSelectedCategory]=useState("popular");

    return(
         <Container>
          <IdeasForTravels onCategorySelect={setSelectedCategory}/>
          <IdeasForTravellsContent ideasCategory={selectedCategory}/>
        </Container>
    )
}

export default IdeasForTravellsPage;