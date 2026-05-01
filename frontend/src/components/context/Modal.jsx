import React from "react";
import "./Modal.css";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  const { t } = useTranslation();

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <h3 className="modal-title">{title || "Confirmation"}</h3>
        <p className="modal-message">
          {message} || {t("modal.message")}
        </p>
        <div className="modal-actions">
          <button className="btn-modal-cancel" onClick={onClose}>
            {t("modal.annuler")}
          </button>
          <button className="btn-modal-confirm" onClick={onConfirm}>
            {t("modal.confirmer")}
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;
