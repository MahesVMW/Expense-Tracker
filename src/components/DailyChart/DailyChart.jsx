// src/components/Charts/DailyChart.js
import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { AppContext } from '../AppContext/AppContext';

const DailyChart = () => {
  const { entries } = useContext(AppContext);

  // Process data for daily chart
  const daysInMonth = new Date().getDate();
  const data = {
    labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Income',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: Array(daysInMonth).fill(0),
      },
      {
        label: 'Expense',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,99,132,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: Array(daysInMonth).fill(0),
      },
    ],
  };

  entries.forEach(entry => {
    const day = new Date(entry.date).getDate() - 1;
    if (entry.type === 'income') {
      data.datasets[0].data[day] += entry.amount;
    } else if (entry.type === 'expense') {
      data.datasets[1].data[day] += entry.amount;
    }
  });

  return (
    <div>
      <h2>Daily Income and Expenses</h2>
      <Pie data={data} />
    </div>
  );
};

export default DailyChart;
