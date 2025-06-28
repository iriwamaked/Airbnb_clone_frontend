import { Container, Row, Col } from 'react-bootstrap';
import styles from './PropertyReview.module.css';
import PropTypes from 'prop-types';

const PropertyReview = ({ comments = [] }) => {
    // Разбиваем комментарии на пары по 2 на строку
    const commentRows = [];
    for (let i = 0; i < comments.length; i += 2) {
        commentRows.push(comments.slice(i, i + 2));
    }

    return (
        <Container className={styles["ff-2"]}>
            {commentRows.map((row, rowIndex) => (
                <Row className="my-4 gy-4" key={rowIndex}>
                    {row.map((comment, index) => (
                        <Col xs={12} md={6} key={`${rowIndex}-${index}`}>
                            <div className="d-flex align-items-start mb-2">
                                <img
                                    src={comment.userAvatar}
                                    alt={comment.alt || "Аватар користувача"}
                                    className={`me-2 ${styles.avatar}`}
                                    width={48}
                                    height={48}
                                    style={{ borderRadius: '50%' }}
                                />
                                <span className="fw-bold">{comment.userName}</span>
                            </div>
                            <p>{comment.commentText}</p>
                        </Col>
                    ))}
                </Row>
            ))}
            {comments.length > 0 && (
                <div className="text-center mt-4">
                    <button className={styles.button}>
                        Показати всі {comments.length} відгуків
                    </button>
                </div>
            )}
        </Container>
    );
};

PropertyReview.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            userAvatar: PropTypes.string,
            alt: PropTypes.string,
            userName: PropTypes.string,
            commentText: PropTypes.string,
        })
    ),
};

export default PropertyReview;
