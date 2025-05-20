// Документация по React Datepicker https://reactdatepicker.com/
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';
import styles from './CustomDatePicker.module.css';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';



registerLocale('uk', uk);

const CustomDatePicker = ({
  startDate,
  endDate,
  onChange,
  busyRanges = [],
  disabledPast = false,
  minDate,
  maxDate,
  ...props
}) => {
  const today = new Date();
  const defaultStart = minDate || today;
  const defaultMax = maxDate || new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

  // Подсвечиваем busy диапазоны для затемнения и перечёркивания
  const excludeDates = busyRanges.flatMap(({ start, end }) => {
    const dates = [];
    let current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  });

  // Подсветка только первой и последней даты выбранного диапазона
 const highlightDates = [];
if (startDate) highlightDates.push(startDate);
if (endDate && endDate.getTime() !== startDate.getTime()) highlightDates.push(endDate);

  return (
    <DatePicker
      locale="uk"
      selected={startDate || defaultStart}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      minDate={disabledPast ? today : defaultStart}
      maxDate={defaultMax}
      excludeDates={excludeDates}
      highlightDates={highlightDates}
      inline
      dateFormat="dd.MM.yyyy"
      {...props}
    />
  );
};

export default CustomDatePicker;