// Используем библиотеку React DatePicker. Документация: https://reactdatepicker.com/

// Установка зависимостей:
// npm install react-datepicker
// npm install date-fns

import 'react-datepicker/dist/react-datepicker.css'; // встроенные стили
import './CustomDatePicker.css'; // пользовательские стили
import styles from './CustomDatePicker.module.css';

import DatePicker, { registerLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import { useState, useEffect } from 'react';

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
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (errorText) {
      const timer = setTimeout(() => setErrorText(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorText]);

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
        setErrorText('У вибраному діапазоні є зайнята дата');
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
    <>
      <DatePicker
        locale="uk"
        selected={internalStart || defaultStart}
        onChange={handleChange}
        startDate={internalStart}
        endDate={internalEnd}
        selectsRange
        monthsShown={2}
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
      {errorText && (
        <div className={styles.tooltipError}>{errorText}</div>
      )}
    </>
  );
};

export default CustomDatePicker;