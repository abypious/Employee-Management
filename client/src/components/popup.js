import React from "react";
import "../styles/popup.css";

const Popup = ({ title, children, onClose, show, showOk, onOk }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={onClose}>
          <span style={{ color: "red" }}>✖</span>
        </button>
        <h3 className="popup-title">{title}</h3>
        <div className="popup-content">{children}</div>
        {showOk && (
          <div className="popup-actions">
            <button className="btn btn-ok" onClick={onOk}>
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
