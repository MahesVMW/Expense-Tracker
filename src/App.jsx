import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import BrowserRouter or HashRouter as Router
import Home from './components/Home/Home';
import AppProvider from './components/AppContext/AppContext.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ChartPage from './components/ChartPage/ChartPage';

const App = () => {
  return (
    <div className='container-fluid'>
      <AppProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Set Home as default route */}
            <Route path="/home" element={<Home />} /> {/* Additional route for Home */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown route to Home */}
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
