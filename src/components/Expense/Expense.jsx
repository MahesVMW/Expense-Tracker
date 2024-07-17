
import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Expense.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext/AppContext';

const Expense = () => {
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
        { name: 'Shopping', class: 'fa-solid fa-cart-shopping' },
        { name: 'Phone', class: 'fa-solid fa-phone' },
        { name: 'Music', class: 'fa-solid fa-guitar' },
        { name: 'Burger', class: 'fa-solid fa-burger' },
        { name: 'School', class: 'fa-solid fa-school' },
        { name: 'Clothes', class: 'fa-solid fa-shirt' },
        { name: 'Sports', class: 'fa-solid fa-volleyball' },
        { name: 'Car', class: 'fa-solid fa-car' },
        { name: 'Gym', class: 'fa-solid fa-dumbbell' },
        { name: 'Travel', class: 'fa-solid fa-plane-departure' },
        { name: 'Electricity', class: 'fa-solid fa-bolt' },
        { name: 'House', class: 'fa-solid fa-house' },
        { name: 'Medical', class: 'fa fa-house-medical' },
        { name: 'Haircut', class: 'fa fa-cut' },
        { name: 'Cigarette', class: 'fa fa-fire' },
        { name: 'Vegetables', class: 'fa-solid fa-carrot' },
        { name: 'Gift', class: 'fa fa-gift' },
        { name: 'Pet', class: 'fa-solid fa-dog' },
        { name: 'Ice Cream', class: 'fa fa-ice-cream' },
        { name: 'Key', class: 'fa fa-key' }
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
        addEntry({ ...formData, icon: selectedIconName, iconClass: icons.find(icon => icon.name === selectedIconName).class, type: 'Expense' });
        toggleModal();
        navigate('/dashboard');
    };

    return (
        <div className='expense mt-3' id='expense'>
            <div className='container'>
                <div className='card2'>
                    <div className='card-body'>
                        <h5 className='card-title text-center'>Expense Icons</h5>
                        <div className='icon-grid mt-2'>
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

            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content animate-fade-in">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Expense for {selectedIconName}</h5>
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
};

export default Expense;
