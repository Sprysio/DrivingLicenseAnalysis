import React, { useState } from 'react'; 
import { Bar } from 'react-chartjs-2';

const Chart = ({ data }) => {
    const [genderFilter, setGenderFilter] = useState('all');

    // Wykres liczby osób w zależności od województwa
    const wojewodztwoData = {};
    data.forEach(item => {
        if (genderFilter === 'all' || item.PLEC === genderFilter) {
            wojewodztwoData[item.WOJEWODZTWO] = (wojewodztwoData[item.WOJEWODZTWO] || 0) + item.LICZBA;
        }
    });
    
    const sortedKeys = Object.keys(wojewodztwoData).sort();
    const wojewodztwoChartData = {
        labels: sortedKeys,
        datasets: [{
            label: 'Liczba osób',
            data: sortedKeys.map(key => wojewodztwoData[key]),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            categoryPercentage: 0.8,
            barPercentage: 0.9
        }],
    };

    // Wykres stosunku wydawanych praw jazdy do wieku
    const ageData = {};
    data.forEach(item => {
        ageData[item.WIEK] = (ageData[item.WIEK] || 0) + item.LICZBA;
    });
    const ageChartData = {
        labels: Object.keys(ageData),
        datasets: [{
            label: 'Liczba wydanych praw jazdy',
            data: Object.values(ageData),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    maxRotation: 0,
                    minRotation: 0
                }
            },
            y: {
                min: 0,
                ticks: {
                    stepSize: 5000,
                    callback: function(value, index, values) {
                        return value;
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            }
        }
    };

    const handleGenderFilterChange = (gender) => {
        setGenderFilter(gender);
    };

    return (
        <div>
            <div>
                <button onClick={() => handleGenderFilterChange('all')}>Wszyscy</button>
                <button onClick={() => handleGenderFilterChange('K')}>Kobiety</button>
                <button onClick={() => handleGenderFilterChange('M')}>Mężczyźni</button>
            </div>
            <div style={{ marginBottom: '20px' }}>
            <div style={{ width: '800px', height: '500px' }}>
                    <h2>Liczba osób w województwach</h2>
                    <Bar data={wojewodztwoChartData} options={options} />
                </div>
            </div>
            <p><br></br></p>
            <div>
            <div style={{ width: '800px', height: '500px' }}>
                    <h2>Stosunek wydawanych praw jazdy do wieku</h2>
                    <Bar data={ageChartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Chart;
