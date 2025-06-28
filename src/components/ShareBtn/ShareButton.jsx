import styles from './ShareButton.module.css';
import { useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ShareButton = ({imageUrl, title, shortDescription}) => {
    const [show, setShow] = useState(false);
    const shareUrl = window.location.href;

    const message = `${title}\n\n${shortDescription}\n\nПереглянути тут: ${shareUrl}`;

    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Убираем сообщение через 2 сек
        } catch (err) {
            console.error("Помилка копіювання: ", err);
        }
    };

    return (
        <>
            <span className={styles["centered-link"]} onClick={handleShow}>
                <i className="bi bi-share"></i>
                <span className={styles["underline-text"]}>Поділитися</span>
            </span>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center ms-4">Поділитися цим місцем</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Img src={imageUrl} className={styles.imgSharedBtn} />
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>{shortDescription}</Card.Text>
                                <Button variant="light" onClick={handleCopy}> <i className="bi bi-copy me-2"></i>
                                    {copied ? 'Скопійовано!' : 'Копіювати посилання'}
                                </Button>
                            
                        </Card.Body>
                    </Card>
                    <Card>
                    <div className="container">
                        <div className="row ms-2 my-2">Або поділитися в соціальних мережах:</div>
                        <div className="row">
                            {/* Левая колонка */}
                            <div className="col-6 d-flex flex-column align-items-start gap-3">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles["centered-link"]}
                                >
                                    <i className="bi bi-facebook fs-3 text-primary"></i>Facebook
                                </a>
                                <a
                                    href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(message)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles["centered-link"]}
                                >
                                    <i className="bi bi-telegram fs-3 text-primary"></i>Telegram
                                </a>
                            </div>

                            {/* Правая колонка */}
                            <div className="col-6 d-flex flex-column align-items-start gap-3 mb-2">
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles["centered-link"]}
                                >
                                    <i className="bi bi-whatsapp fs-3 text-success me-1"></i>Watsapp
                                </a>
                                <a
                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Поділитися помешканням&body=Ось посилання: ${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles["centered-link"]}
                                >
                                    <i className="bi bi-envelope fs-3 text-danger me-1"></i> E-mail
                                </a>
                            </div>
                            
                        </div>
                    </div></Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрити
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

ShareButton.propTypes={
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired
}

export default ShareButton;