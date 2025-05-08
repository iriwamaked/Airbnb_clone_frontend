import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import styles from "./SearchBar.module.css";
import PropTypes from "prop-types";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ru from "date-fns/locale/ru";

const continents = [
  "Северная Америка", "Южная Америка", "Европа",
  "Азия", "Африка", "Австралия", "Антарктида",
];

const SearchBar = ({ onFocus, onBlur }) => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);
  const [open, setOpen] = useState(null); // 'location' | 'calendar'
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [prevDates, setPrevDates] = useState({ start: null, end: null });

  const wrapperRef = useRef(null);

  const closeAll = () => setOpen(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        !e.target.closest(".rdrMonthAndYearWrapper") &&
        !e.target.closest(".rdrMonths")
      ) {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isSelectingStart, setIsSelectingStart] = useState(true);

 
  


  const formatDate = (date) =>
    date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const checkIn = dateRange[0].startDate;
  const checkOut = dateRange[0].endDate;

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
  
    if (isSelectingStart || startDate.getTime() === endDate.getTime()) {
      setDateRange([{ ...ranges.selection }]);
      setIsSelectingStart(false);
    } else {
      setDateRange([{ ...ranges.selection }]);
      setIsSelectingStart(true);
      closeAll();
    }
  };
  
  return (
    <div ref={wrapperRef} className={styles.searchWrapper} tabIndex={0} onFocus={onFocus} >
      <div className={styles.searchBar}>
        {/* Куда */}
        <div className={styles.searchField} onClick={() => setOpen(open === "location" ? null : "location")}>
          <label>Куда</label>
          <input type="text" value={location} readOnly />
          {open === "location" && (
            <div className={`${styles.dropdown} ${styles.dropdownGrid}`}>
              {continents.map((place) => (
                <div key={place} className={styles.option} onClick={() => {
                  setLocation(place);
                  closeAll();
                }}>
                  🌍 {place}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* Даты */}
        <div className={styles.searchField}>
  <label>Даты</label>
  <input
    type="text"
    readOnly
    onClick={() => {
      setOpen(open === "calendar" ? null : "calendar");
      setIsSelectingStart(true);
    }}
    value={`${formatDate(checkIn)} - ${formatDate(checkOut)}`}
  />
  {open === "calendar" && (
    <div className={styles.calendar}>
      <DateRange
        editableDateInputs={true}
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        locale={ru}
      />
    </div>
  )}
</div>


        <div className={styles.divider} />

        {/* Гости */}
        <div className={styles.searchField}>
          <label>Гости</label>
          <input
            type="text"
            value={`${guests} ${guests === 1 ? "гость" : "гостей"}`}
            readOnly
            onClick={() => setGuests(guests < 10 ? guests + 1 : 1)}
          />
        </div>

        <button className={styles.searchButton} type="submit">
          <span className="material-icons">search</span>
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default SearchBar;
