import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
  <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
    <button className={styles.closeButton} onClick={onClose}>×</button>
    {children}
  </div>
</div>

  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
