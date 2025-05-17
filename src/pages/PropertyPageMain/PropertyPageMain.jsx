import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import styles from './PropertyPageMain.module.css';


function RowColLayoutExample() {
  const [data, setData] = useState([]); // Состояние для хранения данных

  // Загрузка данных
  useEffect(() => {
    // Замените на реальный API-запрос, если необходимо
    const fetchData = async () => {
      try {
        const response = await fetch('/mainpageData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };
    fetchData();
    
  }, []);

  return (
    <Container fluid className="mt-3">
      <Row xs={2} md={4} lg={6}>
        {data.map(item => (
          <Col key={item.id} >
            <Card className={styles['adaptive-card']}>
              <Carousel slide={false} interval={null}>
                {item.attributes.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className={styles['carousel-img']}
                      src={image}
                      alt={`carousel-img-${index}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Title className="d-flex justify-content-between align-items-center">
                <span className={styles['card-title']}>{item.attributes.location}</span>
                <span className={styles.rating}>
                          <i className="bi bi-star-fill me-2"></i>
                          {item.attributes.rating}
                </span>
              </Card.Title>
              <Card.Text className={styles['card-text']}>
                {item.category[0]} <br />
                {item.attributes.price} грн. (ніч)<br />
                {/* Рейтинг: {item.attributes.rating} <br /> */}
              </Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default RowColLayoutExample;