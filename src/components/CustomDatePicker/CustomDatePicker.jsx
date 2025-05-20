// Используем библиотеку React DatePicker. Документация - https://reactdatepicker.com/
//устанавливаем зависимости:
//npm install react-datepicker
// npm install date-fns - для работы с локалью


//испортируем встроенные стили
import 'react-datepicker/dist/react-datepicker.css';
//испортируем свои перезаписанные встроенные стили
import './CustomDatePicker.css';
import styles from './CustomDatePicker.module.css';
//импортируем сам компонент
import DatePicker from 'react-datepicker';
// registerLocale (string, object): loads an imported locale object from date-fns
import { registerLocale } from 'react-datepicker';
// испорт украинской локали
import uk from 'date-fns/locale/uk';
import {useState, useEffect} from 'react';

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

  const[internalStart, setInternalStart]=useState(startDate);
  const [internalEnd, setInternalEnd] = useState(endDate);
  const [openToDate, setOpenToDate] = useState(startDate||defaultStart);
  const [errorText, setErrorText]=useState('');

  

  useEffect(()=>{
    if(errorText){
        const timer = setTimeout(()=>setErrorText(''),5000);
        // const timer = setTimeout(()=>setErrorText('',30000));
        return()=>clearTimeout(timer);
    }
  },[errorText]);

  //Проверка на наличие занятых дат в выбранном дипазоное
  const hasBusyDateInRange=(start,end)=>{
    if(!start||!end) return false;

    const checkDate = new Date(start);
    while(checkDate<=end){
        for (const range of busyRanges){
            const busyStart=new Date(range.start).setHours(0,0,0,0);
            const busyEnd=new Date(range.end).setHours(0,0,0,0);
            const current = checkDate.setHours(0,0,0,0);

            if (current>=busyStart && current <=busyEnd){
                return true;
            }
        }
        checkDate.setDate(checkDate.getDate()+1);
    }
    return false;
  }


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


    const isRangeBusy = (start, end, busyRanges) => {
    if (!start || !end) return false;

    const startTime = new Date(start).setHours(0,0,0,0);
    const endTime = new Date(end).setHours(0,0,0,0);

    for (const range of busyRanges) {
      const busyStart = new Date(range.start).setHours(0,0,0,0);
      const busyEnd = new Date(range.end).setHours(0,0,0,0);

      if (!(endTime < busyStart || startTime > busyEnd)) {
        return true;
      }
    }

    return false;
  };

  const handleChange = (dates) => {
    const [start, end] = dates;

    setInternalStart(start);
    setInternalEnd(end);

    if(start&&!end){
        //покаать месяц выбора
        setOpenToDate(new Date(start.getFullYear(), start.getMonth(),1));
    }

    //если выбран весь диапазон
    if(start&&end){
        if(hasBusyDateInRange(start,end)){
            // alert("Busy dates");
            setInternalStart(null);
            setInternalEnd(null);
            //сохраняем текущий месяц
            setOpenToDate(new Date(start.getFullYear(), start.getMonth(),1))
            setErrorText('У вибраному діапазоні є зайнята дата')
            return
        }
    }

    // if (end && isRangeBusy(start, end, busyRanges)) {
    //   alert('Выбранный диапазон содержит занятые даты. Пожалуйста, выберите другой диапазон.');
    //   onChange([null, null]);
    //   return;
    // }
    // setOpenToDate(start||defaultStart);
    //Вызов внешнего обработчика
    onChange?.(dates);
  };

  //массив для подсветки начальной и конечной дат выбранного диапазона
  const highlightDates = [];
  if (startDate) highlightDates.push(startDate);
  if (endDate && endDate.getTime() !== startDate?.getTime()) highlightDates.push(endDate);

  return (
    <>
    <DatePicker
      locale="uk"                              
      selected={internalStart || defaultStart}          //выбранная дата (начало диапазони или по-дефолту)
      onChange={handleChange}                           //обработчик изменения диапазона
      startDate={internalStart}              
      endDate={internalEnd}
      selectsRange                                  //включает выбор диапазона
      monthsShown={2}                               //показывает 2 месяца рядом
      minDate={disabledPast ? today : defaultStart} //ограничения по выбору дат
      maxDate={defaultMax}                             
      dayClassName={getDayClassName}                //функция для присваивания кастомных классов дням
      highlightDates={highlightDates}               //массив дат, которые нужно подсветить (начало/конец диапазона)
      openToDate={openToDate}
      inline                                        //показывает календарь как встроенный элемент (без поля ввода)
      dateFormat="dd.MM.yyyy"                       //формат отображения дат
      {...props}                                    //прокидывание всех остальных доп.свойств
    />
    {errorText&&(
        <div className={styles.tooltipError}>{errorText}</div>
    )}
    </>
  );
};

export default CustomDatePicker;
