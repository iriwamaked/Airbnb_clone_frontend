import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePlacesAutocomplete from 'use-places-autocomplete';
import useOnClickOutside from '../../hooks/useOnClickOutside';

import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';
import GuestSelector from '../GuestsSelector/GuestSelector';

import { setLocation } from './../../store/slices/locationSlice';
import { setDateRange } from '../../store/slices/dataRangeSlice';

import { GUESTINFOMODES } from './../../components/GuestsSelector/GuestInfoDisplay/GuestInfoModes'

import styles from './SearchPanel.module.css';

import { usePlaceDetails } from '../../hooks/usePlaceDetails';

const SearchPanel = () => {
    const dispatch = useDispatch();

    // const googleApiLoaded = useSelector(state => state.googleApi.ready);
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
    } = usePlacesAutocomplete({
        requestOptions: {
            //ограничение по показу только украинских населенных пунктов!
            componentRestrictions: {country: 'ua'},
        },
    });

    
    // // Синхронизация value и location
    // const [location, setLocalLocation] = useState(value);
    // useEffect(() => {
    //     setLocalLocation(value);
    // }, [value]);

    // // При выборе адреса — устанавливаем и в локальный стейт, и в Redux
    // const handleSelectLocation = (address) => {
    //     setValue(address, false);
    //     dispatch(setLocation(address));
    //     clearSuggestions();
    // };

    const { getPlaceDetails } = usePlaceDetails();

    const handleSelectLocation = async (description, place_id) => {
        try {
            const details = await getPlaceDetails(place_id);

            if (details) {
                //Обновляем строку поиска
                setValue(description, false);
                dispatch(setLocation(details));
                // console.log(details);
                clearSuggestions();
            }
        } catch (err) {
            console.log("Ошибка получения адреса", err);
        }
    };

    //  console.log("Локация в Redux:", location);

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
        console.log('handleDateChange:', newStart, newEnd);
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

    //Гости
    const guests = useSelector((state) => state.guests);
    const { adults, children, infants, pets } = useSelector(state => state.guests);
    const totalGuests = adults + children;
    const parts = [];
    if (adults) parts.push(`${adults} ${adults === 1 ? "дорослий" : "дорослих"}`);
    if (children) parts.push(`${children} ${children === 1 ? "дитина" : "дітей"}`);
    if (infants) parts.push(`${infants} ${infants === 1 ? "немовля" : "немовлят"}`);
    if (pets) parts.push(`${pets} ${pets === 1 ? "тварина" : "тварини"}`);

    const guestsSummary = parts.length > 0 ? parts.join(", ") : "Виберіть гостей";

    const location = useSelector((state) => state.location);
    const dateRange = useSelector((state) => state.dateRange || {});

    const onSearchClick = () => {
        const params = new URLSearchParams();
        console.log(location)
        // Добавляем отдельные поля локации
        if (location && Object.keys(location).length > 0) {
            if (location.location.country) params.append('country', location.location.country);
            if (location.location.region) params.append('region', location.location.region);
            if (location.location.city) params.append('city', location.location.city);
            if (location.location.street) params.append('street', location.location.street);
            if (location.location.houseNumber) params.append('houseNumber', location.location.houseNumber);
            if (location.location.lat) params.append('lat', location.location.lat);
            if (location.location.lng) params.append('lng', location.location.lng);
        }
        else {
            console.log("Локация пустая")
        }

        // params.append('startDate', startDateRaw);
        // Добавляем даты
        if (dateRange.startDate) {
            const start = new Date(dateRange.startDate);
            params.append('startDate', start.toISOString().split('T')[0]);
        }
        else console.log("стартовая дата пустая");
        if (dateRange.endDate) {
            const end = new Date(dateRange.startDate);
            params.append('endDate',end.toISOString().split('T')[0]);
        }

        // Добавляем гостей
        const { adults, children, infants, pets } = guests;
        if (adults) params.append('adults', adults);
        if (children) params.append('children', children);
        if (infants) params.append('infants', infants);
        if (pets) params.append('pets', pets);

        const queryString = params.toString();
        console.log('Пошуковий запит:', queryString);

        // Например, можно сделать редирект:
        // navigate(`/search?${queryString}`);
    };

    return (
        <div className={styles.searchBar}>

            {/* 1. Поле ввода локации */}
            <div className={`${styles.inputGroup} ${styles.inputGroupBorder}`} ref={locationRef}>
                <label className="text-center">Куди</label>
                {ready ? (
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
                                    <li key={place_id} onClick={() => handleSelectLocation(description, place_id)}>
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
                <input className='text-center' readOnly value={guestsSummary} placeholder="Виберіть гостей" />
                {guestsOpen && (
                    <div className={styles.guestWrapper}>
                        <GuestSelector petsAllowed onClose={() => setGuestsOpen(false)} mode={GUESTINFOMODES.SEARCHPANEL} />
                    </div>
                )}
            </div>

            {/* 4. Кнопка поиска */}
            <button
                className={styles.searchButton}
                onClick={() => {
                    // console.log({ location, startDate, endDate });
                    onSearchClick()
                }}
            >
                <i className="bi bi-search fs-5"></i>
            </button>
        </div>
    );
};

export default SearchPanel;
