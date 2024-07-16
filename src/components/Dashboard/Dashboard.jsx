import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext/AppContext';
import CustomModal from '../CustomModal/CustomModal';
import { CSSTransition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboard = () => {
    const { entries, deleteEntry, updateEntry } = useContext(AppContext);
    const [editIndex, setEditIndex] = useState(-1);
    const [selectedIconName, setSelectedIconName] = useState('');
    const [editFormData, setEditFormData] = useState({
        amount: '',
        note: '',
        date: ''
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');

    const handleEdit = (index) => {
        setEditIndex(index);
        const entryToEdit = entries[index];
        setEditFormData({
            amount: entryToEdit.amount,
            note: entryToEdit.note,
            date: entryToEdit.date
        });
        setSelectedIconName(entryToEdit.icon);
    };

    const handleSaveEdit = (index) => {
        updateEntry(entries[index].id, {
            ...entries[index],
            amount: editFormData.amount,
            note: editFormData.note,
            date: editFormData.date
        });
        setNotificationMessage(`Entry for ${selectedIconName} has been updated.`);
        setNotificationType('update');
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000); // Hide notification after 3 seconds
        setEditIndex(-1);
    };

    const handleCancelEdit = () => {
        setEditIndex(-1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleDeleteClick = (index) => {
        setDeleteIndex(index);
        setItemToDelete(entries[index]);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        deleteEntry(entries[deleteIndex].id);
        setNotificationMessage(`Entry for ${itemToDelete.icon} has been deleted.`);
        setNotificationType('delete');
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000); // Hide notification after 3 seconds
        setShowDeleteModal(false);
        setDeleteIndex(-1);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setDeleteIndex(-1);
    };

    return (
        <div className='dashboard mt-3'>
            <div className='container'>
                <h2 className='text-center'>Income & Expense Dashboard</h2>
                {entries.length === 0 ? (
                    <div className="no-entries-message text-center">
                        <p>No entries found. <Link to='/Home' className="text-decoration-underline">Add entries for income and expense</Link></p>
                    </div>
                ) : (
                    <div className='row mt-5'>
                        {entries.map((entry, index) => (
                            <div key={index} className='col-12 col-md-6 col-lg-4 mb-3'>
                                <div className='card1'>
                                    <div className='card-header1 d-flex justify-content-end'>
                                        <button className='btn btn-link p-0' onClick={() => handleEdit(index)}><i className="fa-solid fa-pen-to-square edit-icon"></i></button>
                                        <button className='btn btn-link p-0' onClick={() => handleDeleteClick(index)}><i className="fa-solid fa-trash delete-icon"></i></button>
                                    </div>
                                    <div className='card-body1'>
                                        <div className='icon-container'>
                                            <i className={entry.iconClass}></i>
                                            <p>{entry.icon}</p>
                                        </div>
                                        <h5 className='card-title'>{entry.type === 'income' ? 'Income' : 'Expense'}</h5>
                                        <p className='card-text'><strong>Amount:</strong> {entry.amount}</p>
                                        <p className='card-text'><strong>Note:</strong> {entry.note}</p>
                                        <p className='card-text'><strong>Date:</strong> {entry.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {editIndex !== -1 && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Entry for {selectedIconName}</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleCancelEdit}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(editIndex); }}>
                                    <div className="mb-3">
                                        <label htmlFor="edit-amount" className="form-label">Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="edit-amount"
                                            name="amount"
                                            value={editFormData.amount}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edit-note" className="form-label">Note</label>
                                        <textarea
                                            className="form-control"
                                            id="edit-note"
                                            name="note"
                                            rows="3"
                                            value={editFormData.note}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edit-date" className="form-label">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="edit-date"
                                            name="date"
                                            value={editFormData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success">Update</button>
                                    <button type="button" className="btn btn-secondary ml-2" onClick={handleCancelEdit}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <CustomModal
                show={showDeleteModal}
                title="Confirm Delete"
                message={`Are you sure you want to delete this entry for ${itemToDelete ? itemToDelete.icon : ''}?`}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
            <CSSTransition
                in={showNotification}
                timeout={3000}
                classNames="fade"
                unmountOnExit
            >
                <div className={`notification ${notificationType}`}>
                    {notificationMessage}
                </div>
            </CSSTransition>
        </div>
    );
};

export default Dashboard;
