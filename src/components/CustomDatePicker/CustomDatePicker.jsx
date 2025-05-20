// Используем библиотеку React DatePicker. Документация - https://reactdatepicker.com/
//устанавливаем зависимости:
//npm install react-datepicker
// npm install date-fns - для работы с локалью


//испортируем встроенные стили
import 'react-datepicker/dist/react-datepicker.css';
//испортируем свои перезаписанные встроенные стили
import './CustomDatePicker.css';
// import styles from './CustomDatePicker.module.css';
//импортируем сам компонент
import DatePicker from 'react-datepicker';
// registerLocale (string, object): loads an imported locale object from date-fns
import { registerLocale } from 'react-datepicker';
// испорт украинской локали
import uk from 'date-fns/locale/uk';
//регистрация украинской локали в datePicker
registerLocale('uk', uk);

const CustomDatePicker = ({
//деструктурируем пропсы
// начальная и конечная даты выбранного диапазона
  startDate,
  endDate,
  //колбэк для изменения выбранных дат
  onChange,
  //массив объектов с занятыми диапазонами ({start,end})
  busyRanges = [],
  //флаг, запрещающий выбор прошедших дат
  disabledPast = false,
  //границы выбора
  minDate,
  maxDate,
  //остальные переданные свойства типа className, id и т.д.
  ...props
}) => {

  const today = new Date();
  //минимальная дата, начаниая с которой можно выбирать (по дефолту - сегодня)
  const defaultStart = minDate || today;
  //максимальная дата (по дефолту + 6 месяцев от текущей даты)
  const defaultMax = maxDate || new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

  // Подсвечивание занятых дат, функция проверет попадает ли день в занятый диапазон
  const getDayClassName = (date) => {
    for (const range of busyRanges) {
      const start = new Date(range.start).setHours(0, 0, 0, 0);
      const end = new Date(range.end).setHours(0, 0, 0, 0);
      const current = new Date(date).setHours(0, 0, 0, 0);
        //если попадает - возвращает класс для оформления
      if (current >= start && current <= end) {
        return 'busy-day';
      }
    }
    return undefined;
  };

  //масси для подсветки начальной и конечной дат выбранного диапазона
  const highlightDates = [];
  if (startDate) highlightDates.push(startDate);
  if (endDate && endDate.getTime() !== startDate?.getTime()) highlightDates.push(endDate);

  return (
    <DatePicker
      locale="uk"                              
      selected={startDate || defaultStart}          //выбранная дата (начало диапазони или по-дефолту)
      onChange={onChange}                           //обработчик изменения диапазона
      startDate={startDate}              
      endDate={endDate}
      selectsRange                                  //включает выбор диапазона
      monthsShown={2}                               //показывает 2 месяца рядом
      minDate={disabledPast ? today : defaultStart} //ограничения по выбору дат
      maxDate={defaultMax}                             
      dayClassName={getDayClassName}                //функция для присваивания кастомных классов дням
      highlightDates={highlightDates}               //массив дат, которые нужно подсветить (начало/конец диапазона)
      inline                                        //показывает календарь как встроенный элемент (без поля ввода)
      dateFormat="dd.MM.yyyy"                       //формат отображения дат
      {...props}                                    //прокидывание всех остальных доп.свойств
    />
  );
};

export default CustomDatePicker;
