import { useState } from "react";
import CustomDatePicker from "../components/CustomDatePicker/CustomDatePicker";

const TestPage=()=>{

  // Стейт для выбранного диапазона
  const [range, setRange] = useState([null, null]);
  const [startDate, endDate] = range;

  // Занятые диапазоны дат (несколько)
  const busyRanges = [
    { start: new Date(2025, 5, 20), end: new Date(2025, 5, 22) },
    { start: new Date(2025, 5, 26), end: new Date(2025, 5, 27) },
  ];

  return (
     <div>
        {/* {if(startDate!==null && endDate!==null){
            <p>{startDate} {endDate}</p>
        }} */}
        
      <CustomDatePicker
        startDate={startDate}
        endDate={endDate}
        onChange={update => setRange(update)}
        busyRanges={busyRanges}
        disabledPast={true}
      />
    </div>
  );
};
export default TestPage;