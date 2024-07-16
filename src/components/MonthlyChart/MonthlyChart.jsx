// src/components/Charts/MonthlyChart.js
import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { AppContext } from '../AppContext/AppContext';

const MonthlyChart = () => {
  const { entries } = useContext(AppContext);

  // Process data for monthly chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Income',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Array(12).fill(0),
      },
      {
        label: 'Expense',
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.6)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: Array(12).fill(0),
      },
    ],
  };

  entries.forEach(entry => {
    const month = new Date(entry.date).getMonth();
    if (entry.type === 'income') {
      data.datasets[0].data[month] += entry.amount;
    } else if (entry.type === 'expense') {
      data.datasets[1].data[month] += entry.amount;
    }
  });

  return (
    <div>
      <h2>Monthly Income and Expenses</h2>
      <Pie data={data} />
    </div>
  );
};

export default MonthlyChart;
