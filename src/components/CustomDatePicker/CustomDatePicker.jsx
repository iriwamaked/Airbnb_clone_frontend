// Используем библиотеку React DatePicker. Документация: https://reactdatepicker.com/

// Установка зависимостей:
// npm install react-datepicker
// npm install date-fns

import 'react-datepicker/dist/react-datepicker.css'; // встроенные стили
import './CustomDatePicker.css'; // пользовательские стили (через module.css не применяются!!!)
import styles from './CustomDatePicker.module.css';

import DatePicker, { registerLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import { useState, useEffect, useRef } from 'react';

// Регистрация украинской локали
registerLocale('uk', uk);

const CustomDatePicker = ({
  startDate,
  endDate,
  onChange,
  busyRanges = [],      // Занятые диапазоны [{start, end}]
  disabledPast = false, // Запрет на выбор прошедших дат
  minDate,
  maxDate,
  ...props              // Остальные свойства: className, id и т.д.
}) => {
  const today = new Date();
  const defaultStart = minDate || today;
  const defaultMax = maxDate || new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

  const [internalStart, setInternalStart] = useState(startDate);
  const [internalEnd, setInternalEnd] = useState(endDate);
  const [openToDate, setOpenToDate] = useState(startDate || defaultStart);
//   const [errorText, setErrorText] = useState('');

 //переменная для количества месяцев календаря, которые отображаются (по умолчанию - два)
  const [monthsToShow, setMonthsToShow] = useState(2); 

  // Следим за шириной окна (АДАПТИВНОСТЬ)
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setMonthsToShow(screenWidth < 768 ? 1 : 2); // < 768px — показывать 1 месяц
    };

    handleResize(); // вызывать при монтировании
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //добавлен ref на обертку календаря
  const pickerRef=useRef(null);

//   useEffect(() => {
//     if (errorText) {
//       const timer = setTimeout(() => setErrorText(''), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [errorText]);

  //добавлено событие (при клике на пустое место календаря сбрасывается выбранный диапазон)
  useEffect(() => {
    const handleClick = (e) => {
      if (
        //проверки, чтобы рекция была только на те части календаря, которые не являются датами
        pickerRef.current &&
        pickerRef.current.contains(e.target) &&
        !e.target.classList.contains('react-datepicker__day') &&
        !e.target.classList.contains('react-datepicker__day--selected') &&
        !e.target.classList.contains('react-datepicker__day--in-range') &&
        !e.target.classList.contains('react-datepicker__day-name') &&
        !e.target.classList.contains('react-datepicker__current-month') 
        //если был клик ВНЕ календаря тоже очищаем даты
        || !pickerRef.current?.contains(e.target)
      ) {
        setInternalStart(null);
        setInternalEnd(null);
        onChange?.([null, null]);
        console.log("PickRef Works");
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onChange]);


  // Проверка, содержит ли диапазон хотя бы одну занятую дату
  const hasBusyDateInRange = (start, end) => {
    if (!start || !end) return false;

    const checkDate = new Date(start);
    while (checkDate <= end) {
      for (const range of busyRanges) {
        const busyStart = new Date(range.start).setHours(0, 0, 0, 0);
        const busyEnd = new Date(range.end).setHours(0, 0, 0, 0);
        const current = new Date(checkDate).setHours(0, 0, 0, 0);

        if (current >= busyStart && current <= busyEnd) {
          return true;
        }
      }
      checkDate.setDate(checkDate.getDate() + 1);
    }
    return false;
  };

  // Классы для подсветки дней в календаре
  const getDayClassName = (date) => {
    const current = new Date(date).setHours(0, 0, 0, 0);

    for (const range of busyRanges) {
      const start = new Date(range.start).setHours(0, 0, 0, 0);
      const end = new Date(range.end).setHours(0, 0, 0, 0);
      if (current >= start && current <= end) {
        return 'busy-day'; // Класс для занятого дня
      }
    }

    // Подсветка диапазона, если пользователь выбрал только начальную дату,
    // и второй конец диапазона попадает в занятые даты
    if (internalStart && !internalEnd) {
      const start = new Date(internalStart).setHours(0, 0, 0, 0);
      if (start < current && hasBusyDateInRange(new Date(start), new Date(current))) {
        return 'disabled-range';
      }
      if (start > current && hasBusyDateInRange(new Date(current), new Date(start))) {
        return 'disabled-range';
      }
    }

    return undefined;
  };

  // Фильтрация: отключаем возможность выбора занятых дат
  const isDateAvailable = (date) => {
    const current = new Date(date).setHours(0, 0, 0, 0);
    for (const range of busyRanges) {
      const start = new Date(range.start).setHours(0, 0, 0, 0);
      const end = new Date(range.end).setHours(0, 0, 0, 0);
      if (current >= start && current <= end) {
        return false;
      }
    }
    return true;
  };

  // Обработчик изменения выбранного диапазона
  const handleChange = (dates) => {
    const [start, end] = dates;

    setInternalStart(start);
    setInternalEnd(end);

    if (start && !end) {
      // Открываем текущий месяц
      setOpenToDate(new Date(start.getFullYear(), start.getMonth(), 1));
    }

    if (start && end) {
      if (hasBusyDateInRange(start, end)) {
        setInternalStart(null);
        setInternalEnd(null);
        setOpenToDate(new Date(start.getFullYear(), start.getMonth(), 1));
        // setErrorText('У вибраному діапазоні є зайнята дата');
        return;
      }
    }

    onChange?.(dates);
  };

  // Подсветка начальной и конечной дат
  const highlightDates = [];
  if (internalStart) highlightDates.push(internalStart);
  if (internalEnd && internalEnd.getTime() !== internalStart?.getTime()) highlightDates.push(internalEnd);

  return (
    //чтобы ref сработал, надо компонент обернуть в div и ему задать атрибут
    <div ref={pickerRef}>
      <DatePicker
        locale="uk"
        selected={internalStart || null} 
        onChange={handleChange}
        startDate={internalStart}
        endDate={internalEnd}
        selectsRange
        monthsShown={monthsToShow}
        minDate={disabledPast ? today : defaultStart}
        maxDate={defaultMax}
        dayClassName={getDayClassName}
        highlightDates={highlightDates}
        openToDate={openToDate}
        inline
        dateFormat="dd.MM.yyyy"
        filterDate={isDateAvailable}
        {...props}
      />
      {/* {errorText && (
        <div className={styles.tooltipError}>{errorText}</div>
      )} */}
    </div>
  );
};

export default CustomDatePicker;