import Chart from 'chart.js/auto';

import React, { useState } from 'react'; 
import { Bar } from 'react-chartjs-2';

const MyChart = ({ data }) => {
    const [genderFilter, setGenderFilter] = useState('all');
    const [ageFilter, setAgeFilter] = useState({ min: 0, max: 100 });

    // Filtrujemy dane na podstawie płci
    const filteredData = data.filter(item => {
        if (genderFilter === 'all') {
            return true;
        }
        return item.PLEC === genderFilter;
    });

    // Filtrujemy dane na podstawie wieku
    const ageFilteredData = filteredData.filter(item => {
        const age = parseInt(item.WIEK);
        return age >= ageFilter.min && age <= ageFilter.max;
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

    // Obliczamy liczbę wydanych praw jazdy w zależności od wieku
    const ageData = {};
    ageFilteredData.forEach(item => {
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

    // Funkcja do aktualizacji filtru płci
    const handleGenderFilterChange = (gender) => {
        setGenderFilter(gender);
    };

    // Funkcja do aktualizacji filtru minimalnego wieku
    const handleMinAgeFilterChange = (event) => {
        const min = parseInt(event.target.value);
        setAgeFilter({ ...ageFilter, min });
    };

    // Funkcja do aktualizacji filtru maksymalnego wieku
    const handleMaxAgeFilterChange = (event) => {
        const max = parseInt(event.target.value);
        setAgeFilter({ ...ageFilter, max });
    };

    return (
        <div>
            {/* Chart num 1 */}
            <div>
                <button onClick={() => handleGenderFilterChange('all')}>Wszyscy</button>
                <button onClick={() => handleGenderFilterChange('K')}>Kobiety</button>
                <button onClick={() => handleGenderFilterChange('M')}>Mężczyźni</button>
            </div>

            <div>
                <h2>Liczba osób w województwach</h2>
                <Bar data={wojewodztwoChartData} />
            </div>

            {/* Chart num 2 */}
            <div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={ageFilter.min}
                    onChange={handleMinAgeFilterChange}
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={ageFilter.max}
                    onChange={handleMaxAgeFilterChange}
                />
                <span>Wybierz zakres wieku: {ageFilter.min} - {ageFilter.max}</span>
            </div>
            <div>
                <h2>Stosunek wydawanych praw jazdy do wieku</h2>
                <Bar data={ageChartData} />
            </div>
        </div>
    );
};

export default MyChart;
