import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
const TemporaryModal=({show, onClose, title = "Приносимо вибачення", message="Компонент в стадії розробки"})=>{
    return(
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <i className="bi bi-alarm me-2"></i>
                <p className='d-inline-block'>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Закрити</Button>
            </Modal.Footer>

        </Modal>
    )
}


TemporaryModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string
};

export default TemporaryModal;

