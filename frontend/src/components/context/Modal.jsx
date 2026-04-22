import React from "react";
import "./Modal.css";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <h3 className="modal-title">{title || "Confirmation"}</h3>
        <p className="modal-message">
          {message || "Êtes-vous sûr de vouloir supprimer cette tâche ?"}
        </p>
        <div className="modal-actions">
          <button className="btn-modal-cancel" onClick={onClose}>
            Annuler
          </button>
          <button className="btn-modal-confirm" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;
