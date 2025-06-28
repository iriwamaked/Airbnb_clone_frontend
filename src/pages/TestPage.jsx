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
         <div style={{ marginTop: "1rem", display: "flex", gap: "2rem" }}>
        <div>
          <strong>Початкова дата:</strong><br />
          {startDate ? startDate.toLocaleDateString("uk-UA") : "Оберіть дату"}
        </div>
        <div>
          <strong>Кінцева дата:</strong><br />
          {endDate ? endDate.toLocaleDateString("uk-UA") : "Оберіть дату"}
        </div>
      </div>
      <CustomDatePicker
        startDate={startDate}
        endDate={endDate}
        onChange={update => setRange(update)}
        busyRanges={busyRanges}
        disabledPast={true}
      />
         {/* Вывод выбранного диапазона, если обе даты выбраны */}
      {startDate && endDate && (
        <p>
          Вибраний діапазон:{" "}
          {startDate.toLocaleDateString("uk-UA")} — {endDate.toLocaleDateString("uk-UA")}
        </p>
      )}
      
    </div>
  );
};
export default TestPage;