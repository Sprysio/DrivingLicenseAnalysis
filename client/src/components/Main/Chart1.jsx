import Chart from 'chart.js/auto';
import React from 'react'; 
import { Bar } from 'react-chartjs-2';
import styles from "./styles.module.css";
const Chart1 = ({ data }) => {
    // Funkcja do obliczania danych w zależności od płci
    const calculateDataByGender = (gender) => {
        const filteredData = data.filter(item => gender === 'all' || item.PLEC === gender);
        const wojewodztwoData = {};
        filteredData.forEach(item => {
            wojewodztwoData[item.WOJEWODZTWO] = (wojewodztwoData[item.WOJEWODZTWO] || 0) + item.LICZBA;
        });
        return wojewodztwoData;
    };

    // Obliczamy dane dla wszystkich, kobiet i mężczyzn
    const allData = calculateDataByGender('all');
    const womenData = calculateDataByGender('K');
    const menData = calculateDataByGender('M');

    const sortedKeys = Object.keys(allData).sort();

    const wojewodztwoChartData = {
        labels: sortedKeys,
        datasets: [
            {
                label: 'Wszyscy',
                data: sortedKeys.map(key => allData[key]),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                categoryPercentage: 0.6, // Zmniejszono szerokość kategorii
                barPercentage: 1, // Pełna szerokość słupka
            },
            {
                label: 'Kobiety',
                data: sortedKeys.map(key => womenData[key]),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                categoryPercentage: 0.6, // Zmniejszono szerokość kategorii
                barPercentage: 1, // Pełna szerokość słupka
            },
            {
                label: 'Mężczyźni',
                data: sortedKeys.map(key => menData[key]),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                categoryPercentage: 0.6, // Zmniejszono szerokość kategorii
                barPercentage: 1, // Pełna szerokość słupka
            }
        ],
    };

    return (
        <div className={styles.chartContainer}>
            <div style={{ width: '800px', height: '500px' }}>
                <h2>Liczba osób w województwach</h2>
                <Bar data={wojewodztwoChartData} />
            </div>
        </div>
    );
};

export default Chart1;
