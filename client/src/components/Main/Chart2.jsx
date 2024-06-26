import React, { useState } from 'react'; 
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import styles from "./styles.module.css";

const Chart2 = ({ data }) => {
    
    const [ageFilter, setAgeFilter] = useState({ min: 0, max: 100 });

    // Filtrujemy dane na podstawie wieku
    const ageFilteredData = data.filter(item => {
        const age = parseInt(item.WIEK);
        return age >= ageFilter.min && age <= ageFilter.max;
    });

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
            fill: true,  // Opcjonalne, aby wypełnić obszar pod linią
            tension: 0.4 // Opcjonalne, aby linie były bardziej krzywe
        }],
    };

    // Funkcja do aktualizacji filtru minimalnego wieku
    const handleMinAgeFilterChange = (event) => {
        const min = parseInt(event.target.value);
        if (min <= ageFilter.max) {
            setAgeFilter({ ...ageFilter, min });
        }
    };

    // Funkcja do aktualizacji filtru maksymalnego wieku
    const handleMaxAgeFilterChange = (event) => {
        const max = parseInt(event.target.value);
        if (max >= ageFilter.min) {
            setAgeFilter({ ...ageFilter, max });
        }
    };

    return (
        <div className={styles.chartContainer}>
            
            <div style={{ width: '800px', height: '500px' }}>
                
                <h2>Stosunek wydawanych praw jazdy do wieku</h2>
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
                <Line data={ageChartData} />
            </div>
        </div>
    );
};

export default Chart2;
