// src/components/CustomModal/CustomModal.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomModal.css';

const CustomModal = ({ show, title, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="custom-modal-backdrop">
            <div className="custom-modal">
                <div className="custom-modal-header">
                    <h5 className="custom-modal-title">{title}</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
                </div>
                <div className="custom-modal-body">
                    <p>{message}</p>
                </div>
                <div className="custom-modal-footer">
                    <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
