import './PropertyCalendar.css'
import styles from './PropertyCalendar.module.css';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setDateRange, clearDateRange } from '../../../store/slices/dataRangeSlice';


const PropertyCalendar = ({ city, busyDates }) => {
    // // Стейт для выбранного диапазона
    // const [range, setRange] = useState([null, null]);
    // const [startDate, endDate] = range;

    const dispatch = useDispatch();
    //обертка вокруг календаря
    const wrapperRef = useRef(null);

    const startDate = useSelector(state => state.dateRange.startDate ? new Date(state.dateRange.startDate) : null);
    const endDate = useSelector(state => state.dateRange.endDate ? new Date(state.dateRange.endDate) : null)

    const nightsCount = useMemo(() => {
        if (!startDate || !endDate) return 0;
        return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    }, [startDate, endDate]);
    // Занятые диапазоны дат (БУДУТ ПРИХОДИТЬ ИЗ ПРОПС!)
    const busyRanges = useMemo(() => {
         return busyDates.map(range => ({
        start: new Date(range.from),
        end: new Date(range.to)
    }));
}, [busyDates]);;
    //  [
    //     { start: new Date(2025, 5, 20), end: new Date(2025, 5, 22) },
    //     { start: new Date(2025, 5, 26), end: new Date(2025, 5, 27) },
    // ];

    //обработчик выбора дат - диспатчим в Redux
    const handleChange = (dates) => {
        //Для надежности можно сериализовать даты в ISO строки:
        const serializeDates = dates.map(date => date ? date.toISOString() : null);
        dispatch(setDateRange(serializeDates));
    };

    const clearDates = () => {
        // 
        dispatch(clearDateRange());
    }

    return (
        <div className={styles["calendar-container"]} ref={wrapperRef}>
            <h4 className="m-0 p-0 mb-2">
                {city}
                {nightsCount === 0 ? "" : `: ${nightsCount} `}
                {nightsCount === 0 ? "" : nightsCount === 1 ? "ніч" : nightsCount >= 2 && nightsCount <= 4 ? "ночі" : "ночей"}
            </h4>

            <span className={!startDate ? styles.placeholder : ''}>
                {startDate ? startDate.toLocaleDateString("uk-UA") : "Прибуття"}
            </span>
            <span className={`ms-3 ${!startDate ? styles.placeholder : ''}`}>
                {endDate ? endDate.toLocaleDateString("uk-UA") : "Виїзд"}
            </span>
            <CustomDatePicker className={styles["custom-calendar-bg"]}
                startDate={startDate}
                endDate={endDate}
                onChange={handleChange}
                busyRanges={busyRanges}
                disabledPast={true}
                wrapperRef={wrapperRef}
            />
            <div className={styles["end-block"]}>
                <i className="bi bi-keyboard fs-4"></i>
                <span className={styles["underline"]} onClick={clearDates}>Очистити дати </span>
            </div>
        </div>
    );
}

PropertyCalendar.propTypes = {
    city: PropTypes.string.isRequired,
     busyDates: PropTypes.arrayOf(
        PropTypes.shape({
            from: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired
        })
    ).isRequired
}

export default PropertyCalendar;