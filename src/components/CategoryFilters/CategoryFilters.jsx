import { useRef, useState, useEffect } from 'react';
import styles from './CategoryFilters.module.css';
import PropTypes from 'prop-types';


const categories = [
  { id: 'all', label: 'Всі', icon: 'apps' },
  { id: 'beach', label: 'Біля моря', icon: 'beach_access' },
  { id: 'mansion', label: 'Особняки', icon: 'apartment' },
  { id: 'legendary', label: 'Легендарне', icon: 'cottage' },
  { id: 'small', label: 'Невеликі', icon: 'home' },
  { id: 'view', label: 'Гарні краєвиди', icon: 'landscape' },
  { id: 'luxe', label: 'Люкс', icon: 'diamond' },
  { id: 'city', label: 'У місті', icon: 'location_city' },
  { id: 'rural', label: 'Сільська місцевість', icon: 'park' },
  { id: 'designer', label: 'Від дизайнера', icon: 'brush' },
  { id: 'hotel', label: 'Готелі', icon: 'hotel' },
  { id: 'hostel', label: 'Хостели', icon: 'meeting_room' },
  { id: 'capsule', label: 'Капсули', icon: 'bed' },
  { id: 'minimal', label: 'Мінімалізм', icon: 'crop_square' },
];

const CategoryFilters = ({ selectedCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    el.addEventListener('scroll', updateScrollButtons);
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, []);

  const scroll = (offset) => {
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleCategoryClick = (id, index) => {
    const el = scrollRef.current;
    const buttons = el.querySelectorAll(`.${styles.button}`);
    if (buttons[index]) {
      const btn = buttons[index];
      const offset = btn.offsetLeft - el.clientWidth / 2 + btn.clientWidth / 2;
      el.scrollTo({ left: offset, behavior: 'smooth' });
    }
    onSelectCategory(id);
  };

  return (
    <div className={styles.wrapper}>
      {canScrollLeft && (
        <button className={styles.scrollArrow} onClick={() => scroll(-200)}>
          <span className="material-icons">chevron_left</span>
        </button>
      )}
      <div className={styles.stickyBar}>
        <div className={styles.categories} ref={scrollRef}>
          {categories.map(({ id, label, icon }, index) => (
            <button
              key={id}
              className={`${styles.button} ${selectedCategory === id ? styles.active : ''}`}
              onClick={() => handleCategoryClick(id, index)}
            >
              <span className={`material-icons ${styles.icon} ${selectedCategory === id ? styles.iconActive : ''}`}>
                {icon}
              </span>
              <span className={styles.label}>{label}</span>
              {selectedCategory === id && <div className={styles.underline} />}
            </button>
          ))}
        </div>
        {canScrollRight && (
        <button className={styles.scrollArrow} onClick={() => scroll(200)}>
          <span className="material-icons">chevron_right</span>
        </button>
      )}
        <div className={styles.extraControls}>
          <button className={styles.filterButton}>
            <span className="material-icons">tune</span> Фільтри
          </button>
          <label className={styles.toggleLabel}>
            Загальна сума до сплати
            <input type="checkbox" />
          </label>

        </div>
      </div>


    </div>
  );
};

CategoryFilters.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilters;