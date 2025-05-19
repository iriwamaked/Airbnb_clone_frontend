import FirstPropertyComponent from './1-propertyComponent/FirstPropertyComponent';
import styles from './OnePropertyPage.module.css';

const OnePropertyPage = ()=>{
    return(
        <div className={styles.container}>
            <FirstPropertyComponent/>
        </div>
    )
}

export default OnePropertyPage;