// src/context/AppContext.js
import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries((prevEntries) => [...prevEntries, { ...entry, id: uuidv4() }]);
  };

  const deleteEntry = (id) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  const updateEntry = (id, updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) => (entry.id === id ? { ...entry, ...updatedEntry } : entry))
    );
  };

  return (
    <AppContext.Provider value={{ entries, addEntry, deleteEntry, updateEntry }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
