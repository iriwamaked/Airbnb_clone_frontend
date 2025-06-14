import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePlacesAutocomplete from 'use-places-autocomplete';
import useOnClickOutside from '../../hooks/useOnClickOutside';

import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';
import GuestSelector from '../GuestsSelector/GuestSelector';

import { setLocation } from './../../store/slices/locationSlice';
import { setDateRange } from '../../store/slices/dataRangeSlice';
import { setGoogleApiReady } from '../../store/slices/googleApiSlice';

import styles from './SearchPanel.module.css';

const SearchPanel = () => {
    const dispatch = useDispatch();

    const googleApiLoaded = useSelector(state => state.googleApi.ready);
    // Получаем даты из Redux, парсим в Date
    const startDateRaw = useSelector(state => state.dateRange.startDate);
    const endDateRaw = useSelector(state => state.dateRange.endDate);
    const startDate = startDateRaw ? new Date(startDateRaw) : null;
    const endDate = endDateRaw ? new Date(endDateRaw) : null;

    // Локальные состояния
    const [datesOpen, setDatesOpen] = useState(null); // null | 'arrival' | 'departure'
    const [guestsOpen, setGuestsOpen] = useState(false);
    // const [location, setLocalLocation] = useState('');

    // Рефы для отслеживания клика вне
    const dateRef = useRef(null);
    const guestsRef = useRef(null);
    const locationRef = useRef(null);

    // Хук для клика вне — закрываем попапы
    useOnClickOutside(dateRef, () => setDatesOpen(null));
    useOnClickOutside(guestsRef, () => setGuestsOpen(false));
    useOnClickOutside(locationRef, () => clearSuggestions());

    // Используем хук без условий
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete();

    // Синхронизация value и location
    const [location, setLocalLocation] = useState(value);
    useEffect(() => {
        setLocalLocation(value);
    }, [value]);

    // При выборе адреса — устанавливаем и в локальный стейт, и в Redux
    const handleSelectLocation = (address) => {
        setValue(address, false);
        dispatch(setLocation(address));
        clearSuggestions();
    };

    // Обработка изменения дат
    const handleDateChange = ([newStart, newEnd]) => {
        if (newStart && !newEnd) {
            // Выбрана дата прибытия — переключаем на выезд
            dispatch(setDateRange([newStart.toISOString(), null]));
            setDatesOpen('departure');
            setTimeout(() => {
                departureInputRef.current?.focus();
            }, 0);
        } else if (newStart && newEnd) {
            // Обе даты выбраны — сохраняем и закрываем календарь
            dispatch(setDateRange([newStart.toISOString(), newEnd.toISOString()]));
            setDatesOpen(null);
        } else {
            // Очистка дат — можно открыть выбор прибытия снова
            dispatch(setDateRange([null, null]));
            setDatesOpen('arrival');
        }
    };

    const arrivalInputRef = useRef(null);
    const departureInputRef = useRef(null);

    const clearDates = () => {
        dispatch(setDateRange([null, null]));
        setDatesOpen('arrival');
    };

    const closeCalendar = () => {
        setDatesOpen(null);
    };

//     useEffect(() => {
//   console.log("Google Maps loaded:", !!window.google?.maps);
//   console.log("Places API loaded:", !!window.google?.maps?.places);
//   console.log("usePlacesAutocomplete ready:", ready);
// }, [ready]);
    return (
        <div className={styles.searchBar}>

            {/* 1. Поле ввода локации */}
            <div className={`${styles.inputGroup} ${styles.inputGroupBorder}`} ref={locationRef}>
                <label className="text-center">Куди</label>
                {ready? (
                    <>
                        <input
                            type="text"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onClick={() => setValue(value, false)}
                            placeholder="Почніть вводити населений пункт"
                            onDoubleClick={() => {
                                setValue('', false);         // очищаем input
                                dispatch(setLocation(''));   // очищаем выбранную локацию в Redux
                                clearSuggestions();          // убираем подсказки
                            }}
                            // disabled={!ready}
                            autoComplete="on"
                            className="text-center"
                        />
                        {status === "OK" && (
                            <ul className={styles.suggestions}>
                                {data.map(({ place_id, description }) => (
                                    <li key={place_id} onClick={() => handleSelectLocation(description)}>
                                        {description}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ) : (
                    <div>Список населених пунктів завантажується...</div>
                )}
                {/* ... */}
            </div>

            {/* 2. Даты — два поля и общий календарь */}
            <div className={styles.dateGroup} ref={dateRef}>
                {/* Прибуття */}
                <div className={`text-center ${styles.inputGroup} ${styles.inputGroupBorder}`} onClick={() => setDatesOpen('arrival')}>
                    <label>Прибуття</label>
                    <input
                        ref={arrivalInputRef}
                        readOnly
                        value={startDate ? startDate.toLocaleDateString('uk-UA') : 'Оберіть дату'}
                        placeholder="Оберіть дату"
                        className='text-center'
                    />
                </div>

                {/* Виїзд */}
                <div className={` text-center ${styles.inputGroup} ${styles.inputGroupBorder}`} onClick={() => setDatesOpen('departure')}>
                    <label>Виїзд</label>
                    <input
                        ref={departureInputRef}
                        readOnly
                        value={endDate ? endDate.toLocaleDateString('uk-UA') : 'Оберіть дату'}
                        placeholder="Оберіть дату"
                        className='text-center'
                    />
                </div>

                {/* Общий календарь — показываем, если открыт любой из полей */}
                {datesOpen && (
                    <>
                        <div className={styles.pickerWrapper}>
                            <CustomDatePicker
                                startDate={startDate}
                                endDate={endDate}
                                selectsStart={datesOpen === 'arrival'}
                                selectsEnd={datesOpen === 'departure'}
                                disabledPast={true}
                                minDate={datesOpen === 'departure' ? startDate : undefined}
                                onChange={handleDateChange}
                            />
                            <div className={`${styles["end-block"]}`}>

                                <span className={styles.underline} onClick={clearDates}>Очистити дати </span>

                                <button
                                    onClick={closeCalendar}
                                    className={styles["close-calendar-button"]}  >
                                    Закрити
                                </button>

                            </div>
                        </div>

                    </>

                )}
            </div>

            {/* 3. Выбор гостей */}
            <div className={`${styles.inputGroup} `} onClick={() => setGuestsOpen(true)} ref={guestsRef} tabIndex={0}>
                <label className='text-center'>Гості</label>
                <input className='text-center' readOnly value="Виберіть гостей" placeholder="Виберіть гостей" />
                {guestsOpen && (
                    <div className={styles.guestWrapper}>
                        <GuestSelector maxGuests={5} maxPets={2} petsAllowed onClose={() => setGuestsOpen(false)} />
                    </div>
                )}
            </div>

            {/* 4. Кнопка поиска */}
            <button
                className={styles.searchButton}
                onClick={() => {
                    console.log({ location, startDate, endDate });
                    // TODO: добавить логику поиска
                }}
            >
                <i className="bi bi-search fs-5"></i>
            </button>
        </div>
    );
};

export default SearchPanel;
