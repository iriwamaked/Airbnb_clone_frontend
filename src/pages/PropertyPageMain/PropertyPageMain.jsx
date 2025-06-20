import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import styles from './PropertyPageMain.module.css';
import {useNavigate} from 'react-router-dom';

function RowColLayoutExample() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`/mainpageData.json?page=${page}&limit=10`); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();

      if (jsonData.data.length < 10) {
        setHasMore(false);
      }

      setData(prev => [...prev, ...jsonData.data]);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleShowMore = () => {
    setPage(prev => prev + 1);
  };

  const navigate = useNavigate(); 
  
  const handleCardClick=(id)=>{
    navigate(`/product/${id}`);
  }

  return (
    <>
      <Container fluid className="mt-3">
        <Row xs={2} md={4} lg={6}>
          {data.map(item => (
            <Col key={item.id}>
              <Card className={styles['adaptive-card']} >
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
                <div onClick={()=>handleCardClick(item.i)}>
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
