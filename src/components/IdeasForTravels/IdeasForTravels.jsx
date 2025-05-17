import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from './IdeasForTravels.module.css'

function IdeasForTravels({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    fetch('/testData/ideasForTravels.json')
      .then(res => res.json())
      .then(data => {
        setCategories(data.ideasCategory);
        if (data.ideasCategory.length > 0) {
          setActiveKey(data.ideasCategory[0].key);
          onCategorySelect(data.ideasCategory[0].key); // загрузка первой категории
        }
      })
      .catch(err => console.error('Ошибка загрузки категорий:', err));
  }, [onCategorySelect]);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
    onCategorySelect(selectedKey);
  };

  return (
    <Nav activeKey={activeKey} onSelect={handleSelect}>
      {categories.map(cat => (
        <Nav.Item key={cat.key}>
          <Nav.Link eventKey={cat.key}
                    className={`${styles.customNavLink} ${activeKey === cat.key ? styles.activeLink : ''}`}>
                        {cat.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default IdeasForTravels;