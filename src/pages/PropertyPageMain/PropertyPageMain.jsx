import { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import styles from './PropertyPageMain.module.css';
import { useNavigate } from 'react-router-dom';

function RowColLayoutExample() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async (currentPage, existingData) => {
    try {
      const response = await fetch(`/mainpageData.json?page=${currentPage}&limit=10`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const jsonData = await response.json();

      const uniqueNewData = jsonData.data.filter(
        newItem => !existingData.some(existing => existing.id === newItem.id)
      );

      if (uniqueNewData.length < 10) setHasMore(false);
      setData(prev => [...prev, ...uniqueNewData]);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  }, []);

  useEffect(() => {
    fetchData(page, data);
  }, [page]);

  const handleShowMore = () => {
    setPage(prev => prev + 1);
  };

  const handleCardClick = (id) => {
    navigate(`/singleproperty?id=${id}`);
  };

  return (
    <>
      <Container fluid className="mt-3">
        <Row xs={2} md={4} lg={6}>
          {data.map(item => (
            <Col key={item.id}>
              <Card className={styles['adaptive-card']}>
                <Carousel slide={false} interval={null}>
                  {item.attributes.images.map((image, index) => (
                    <Carousel.Item key={`${item.id}-${index}`}>
                      <img
                        className={styles['carousel-img']}
                        src={image}
                        alt={`carousel-img-${index}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <div onClick={() => handleCardClick(item.id)}>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    <span className={styles['card-title']}>{item.attributes.location}</span>
                    <span className={styles.rating}>
                      <i className="bi bi-star-fill me-2"></i>
                      {item.attributes.rating}
                    </span>
                  </Card.Title>
                  <Card.Text className={styles['card-text']}>
                    {item.category[0]} <br />
                    {item.attributes.price} грн. (ніч)
                  </Card.Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {hasMore && (
        <div className="text-center mt-4">
          <button className={styles["btn-show-more"]} onClick={handleShowMore}>
            Показати більше
          </button>
        </div>
      )}
    </>
  );
}

export default RowColLayoutExample;
