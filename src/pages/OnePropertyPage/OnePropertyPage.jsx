import FirstPropertyComponent from './1-propertyComponent/FirstPropertyComponent';
import PropertyImagesComponent from './2-propertyImages/PropertyImagesComponent';
import styles from './OnePropertyPage.module.css';

const OnePropertyPage = ()=>{
    return(
        <div className={styles.container}>
            <FirstPropertyComponent/>
            <PropertyImagesComponent/>
        </div>
    )
}

export default OnePropertyPage;