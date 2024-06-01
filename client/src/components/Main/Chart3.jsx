import React, { useState } from 'react'; 
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import styles from "./styles.module.css";

const Chart3 = ({ data }) => {
    const [selectedRegions, setSelectedRegions] = useState({});

    // Inicjalizacja stanów dla województw
    const regions = Array.from(new Set(data.map(item => item.WOJEWODZTWO.toLowerCase().replace("woj. ", ""))));

    // Funkcja do zarządzania zaznaczeniem checkboxów
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedRegions({
            ...selectedRegions,
            [name]: checked,
        });
    };

    // Filtrowanie danych na podstawie zaznaczonych województw
    const filteredData = data.filter(item => selectedRegions[item.WOJEWODZTWO.toLowerCase().replace("woj. ", "")]);

    // Obliczamy liczbę wydanych praw jazdy dla każdego miesiąca
    const monthlyChartData = {
        labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
        datasets: [{
            label: 'Liczba wydanych praw jazdy',
            data: Array(12).fill(0), // Inicjalizujemy tablicę zerami dla każdego miesiąca
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }],
    };

    // Wypełniamy dane dla każdego miesiąca
    filteredData.forEach(item => {
        const month = new Date(item.DATA_MC).getMonth(); // Pobieramy numer miesiąca (0-11)
        monthlyChartData.datasets[0].data[month] += item.LICZBA;
    });

    return (
        <div className={styles.chartContainer}>
            <h2>Liczba wydanych praw jazdy dla każdego miesiąca</h2>
            <details className={styles.detailsContainer}>
                <summary className={styles.summaryButton}>Wybierz województwa</summary>
                <div className={styles.checkboxContainer}>
                    {regions.map(region => (
                        <label key={region} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name={region}
                                checked={selectedRegions[region] || false}
                                onChange={handleCheckboxChange}
                                className={styles.checkboxInput}
                            />
                            <span className={styles.checkboxText}>{region}</span>
                        </label>
                    ))}
                </div>
            </details>
            <div style={{ width: '800px', height: '500px' }}>
                <Bar data={monthlyChartData} />
            </div>
        </div>
    );
};

export default Chart3;
