import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <Link to='/' className="navbar-brand text-white">Expense Tracker</Link>
      <button className="navbar-toggler white-toggler" type="button" onClick={toggleNavbar}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
        <button type="button" className="close-btn" onClick={closeNavbar}>×</button>
        {isOpen && (
          <div className="navbar-extra-text">
            <span>Expense Tracker</span>
          </div>
        )}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to='/Home' className="nav-link" onClick={closeNavbar}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to='/Dashboard' className="nav-link" onClick={closeNavbar}>Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to='/chart' className="nav-link" onClick={closeNavbar}>Chart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
