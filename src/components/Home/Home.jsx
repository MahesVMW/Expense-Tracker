import React, { useState } from 'react';
import Expense from '../Expense/Expense';
import Income from '../Income/Income';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  const [activeComponent, setActiveComponent] = useState('expense');

  const renderComponent = () => {
    if (activeComponent === 'income') {
      return <Income />;
    }
    return <Expense />;
  };

  return (
    <div className='Home'>
      <div className="d-flex justify-content-center my-3">
        <div className="btn-group" role="group" aria-label="Income and Expense Toggle">
          <button
            type="button"
            className={`btn ${activeComponent === 'income' ? 'tracker1' : 'tracker2'}`}
            onClick={() => setActiveComponent('income')}
          >
            Income
          </button>
          <button
            type="button"
            className={`btn ${activeComponent === 'expense' ? 'tracker1' : 'tracker2'}`}
            onClick={() => setActiveComponent('expense')}
          >
            Expense
          </button>
        </div>
      </div>
      <div className="mt-3">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Home;
