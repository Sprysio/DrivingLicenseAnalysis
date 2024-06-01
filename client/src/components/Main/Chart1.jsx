import Chart from 'chart.js/auto';

import React, { useState } from 'react'; 
import { Bar } from 'react-chartjs-2';


const Chart1 = ({ data }) => {
    const [genderFilter, setGenderFilter] = useState('all');

    // Filtrujemy dane na podstawie płci
    const filteredData = data.filter(item => {
        if (genderFilter === 'all') {
            return true;
        }
        return item.PLEC === genderFilter;
    });

    // Obliczamy liczbę osób w zależności od województwa
    const wojewodztwoData = {};
    filteredData.forEach(item => {
        wojewodztwoData[item.WOJEWODZTWO] = (wojewodztwoData[item.WOJEWODZTWO] || 0) + item.LICZBA;
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

    // Funkcja do aktualizacji filtru płci
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
            <div style={{ width: '800px', height: '500px' }}>
                <h2>Liczba osób w województwach</h2>
                <Bar data={wojewodztwoChartData} />
            </div>
        </div>
    );
};

export default Chart1;
