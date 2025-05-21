import './PropertyCalendar.css'
import styles from './PropertyCalendar.module.css';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import { useState } from 'react';

const PropertyCalendar = () => {
    // Стейт для выбранного диапазона
    const [range, setRange] = useState([null, null]);
    const [startDate, endDate] = range;

    // Занятые диапазоны дат (БУДУТ ПРИХОДИТЬ ИЗ ПРОПС!)
    const busyRanges = [
        { start: new Date(2025, 5, 20), end: new Date(2025, 5, 22) },
        { start: new Date(2025, 5, 26), end: new Date(2025, 5, 27) },
    ];

    const clearDates=()=>{
        setRange([null,null])
    }

    return (
        <div className={styles["calendar-container"]}>
            <h4 className="m-0 p-0 mb-2">Одеса: 5 ночей</h4>
            <span className={!startDate ? styles.placeholder : ''}>
                {startDate ? startDate.toLocaleDateString("uk-UA") : "Оберіть дату"}
            </span>
            <span className={`ms-3 ${!startDate ? styles.placeholder : ''}`}>
                {endDate ? endDate.toLocaleDateString("uk-UA") : "Оберіть дату"}
            </span>
            <CustomDatePicker className={styles["custom-calendar-bg"]}
                startDate={startDate}
                endDate={endDate}
                onChange={update => setRange(update)}
                busyRanges={busyRanges}
                disabledPast={true}
            />
            <div className={styles["end-block"]}>
                <i className="bi bi-keyboard fs-4"></i>
                <span className={styles["underline"]} onClick={clearDates}>Очистити дати </span>
            </div>
        </div>
    );
}

export default PropertyCalendar;