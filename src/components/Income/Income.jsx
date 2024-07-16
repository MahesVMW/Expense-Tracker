// src/components/Income/Income.js
import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Income.css';
import { AppContext } from '../AppContext/AppContext';
import { useNavigate } from 'react-router-dom';

const Income = () => {
    const navigate = useNavigate();
    const { addEntry } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedIconName, setSelectedIconName] = useState('');
    const [formData, setFormData] = useState({
        amount: '',
        note: '',
        date: ''
    });

    const icons = [
        { name: 'Investments', class: 'fa-solid fa-tree' },
        { name: 'Awards', class: 'fa-solid fa-award' },
        { name: 'Salary', class: 'fa-solid fa-money-bill' },
        { name: 'Part-time', class: 'fa-solid fa-clock' },
        { name: 'Others', class: 'fa-solid fa-coins' },
    ];

    const toggleModal = (iconName = '') => {
        setSelectedIconName(iconName);
        setShowModal(!showModal);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEntry({ ...formData, icon: selectedIconName, iconClass: icons.find(icon => icon.name === selectedIconName).class, type: 'income' });
        toggleModal();
        navigate('/dashboard');
    };

    return (
        <div className='income mt-3' id='income'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-lg-6'>
                        <div className='card3'>
                            <div className='card-body3'>
                                <h5 className='card-title text-center'>Income Icons</h5>
                                <div className='icon-grid'>
                                    {icons.map((icon, index) => (
                                        <div key={index} className='icon-item text-center'>
                                            <i className={icon.class} style={{ fontSize: '24px', cursor: 'pointer' }} onClick={() => toggleModal(icon.name)}></i>
                                            <p>{icon.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content animate-fade-in">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Income for {selectedIconName}</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="note" className="form-label">Note</label>
                                        <textarea
                                            className="form-control"
                                            id="note"
                                            name="note"
                                            rows="3"
                                            value={formData.note}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Income;
