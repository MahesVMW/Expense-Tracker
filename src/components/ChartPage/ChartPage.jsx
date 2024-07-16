import React, { useContext } from 'react';
import './ChartPage.css';
import { AppContext } from '../AppContext/AppContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPage = () => {
    const { entries } = useContext(AppContext);

    const prepareChartData = () => {
        const categories = {};
        const incomeColor = 'rgb(69, 175, 201)'; // Color for income items
        const expenseColor = 'rgba(255, 99, 132, 0.6)'; // Color for expense items

        let totalAmount = 0; // Track the total amount for calculating percentages

        entries.forEach(entry => {
            const category = entry.icon;
            totalAmount += Number(entry.amount); // Sum up the total amount

            if (!categories[category]) {
                categories[category] = { label: entry.icon, amount: 0, type: entry.type };
            }
            categories[category].amount += Number(entry.amount);
        });

        const labels = Object.keys(categories);
        const data = labels.map(label => categories[label].amount);
        const backgroundColors = labels.map(label => categories[label].type === 'income' ? incomeColor : expenseColor);

        return {
            totalAmount,
            labels,
            datasets: [
                {
                    label: 'Entries',
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
                    borderWidth: 1,
                    hoverBackgroundColor: backgroundColors.map(color => color.replace('0.6', '0.8')),
                    hoverBorderColor: backgroundColors.map(color => color.replace('0.6', '1')),
                    data,
                },
            ],
        };
    };

    const chartData = prepareChartData();

    const chartOptions = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'white', // Set legend label color to white
                    generateLabels: (chart) => {
                        const data = chart.data;
                        const incomeIndices = [];
                        const expenseIndices = [];
                        data.labels.forEach((label, index) => {
                            if (data.datasets[0].backgroundColor[index] === 'rgb(69, 175, 201)') {
                                incomeIndices.push(index);
                            } else {
                                expenseIndices.push(index);
                            }
                        });
                        return [
                            {
                                text: 'Income',
                                fillStyle: 'rgb(69, 175, 201)',
                                strokeStyle: 'white', // Set stroke style to white for 'Income' label
                                hidden: incomeIndices.every(index => isNaN(data.datasets[0].data[index]) || data.datasets[0].data[index] === null),
                                index: incomeIndices,
                            },
                            {
                                text: 'Expense',
                                fillStyle: 'rgba(255, 99, 132, 0.6)',
                                strokeStyle: 'white', // Set stroke style to white for 'Expense' label
                                hidden: expenseIndices.every(index => isNaN(data.datasets[0].data[index]) || data.datasets[0].data[index] === null),
                                index: expenseIndices,
                            },
                        ];
                    },
                    usePointStyle: true,
                    fontColor: 'white' // Set legend font color to white
                },
            },
            tooltip: {
                enabled: true,
                titleColor: 'white', // Set tooltip title color to white
                bodyColor: 'white', // Set tooltip body color to white
            },
        },
    };

    const calculatePercentage = (amount, totalAmount) => {
        return ((amount / totalAmount) * 100).toFixed(2);
    };

    return (
        <div className='chart-page'>
            <div className='container'>
                <h2 className='mb-4'>Income & Expenses by Category</h2>
                {entries.length === 0 ? (
                    <div className="no-entries-message text-center">
                        <p>No entries to display in the chart. <Link to='/Home' className="text-decoration-underline">Add entries for income and expense</Link></p>
                    </div>
                ) : (
                    <div className="chart-progress-row">
                        <div className="chart-container">
                            <Pie data={chartData} options={chartOptions} width={300} height={300} />
                        </div>
                        <div className="progress-bars">
                            {entries.map((entry, index) => (
                                <div key={index} className="progress-entry mb-2">
                                    <div className="d-flex align-items-center">
                                        <i className={`${entry.iconClass} me-2`}></i>
                                        <span className="me-auto">{entry.icon}</span>
                                        <span>{calculatePercentage(entry.amount, chartData.totalAmount)}%</span>
                                    </div>
                                    <div className="progress">
                                        <div 
                                            className="progress-bar" 
                                            role="progressbar" 
                                            style={{ width: `${calculatePercentage(entry.amount, chartData.totalAmount)}%`, backgroundColor: entry.type === 'income' ? 'rgb(69, 175, 201)' : 'rgba(255, 99, 132, 0.6)' }} 
                                            aria-valuenow={calculatePercentage(entry.amount, chartData.totalAmount)} 
                                            aria-valuemin="0" 
                                            aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChartPage;
