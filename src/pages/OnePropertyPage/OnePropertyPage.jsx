import styles from './OnePropertyPage.module.css';

import FirstPropertyComponent from './1-propertyComponent/FirstPropertyComponent';
import PropertyImagesComponent from './2-propertyImages/PropertyImagesComponent';

import Widget from './4-propertyComponentWidget/Widget';

const OnePropertyPage = ()=>{
    return(
        <div className={styles.container}>
            <FirstPropertyComponent/>
            <PropertyImagesComponent/>
            <Widget/>
        </div>
    )
}

export default OnePropertyPage;