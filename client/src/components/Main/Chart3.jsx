import React from 'react'; 
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Chart3 = ({ data }) => {
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
    data.forEach(item => {
        const month = new Date(item.DATA_MC).getMonth(); // Pobieramy numer miesiąca (0-11)
        monthlyChartData.datasets[0].data[month] += item.LICZBA;
    });

    return (
        <div style={{ width: '800px', height: '500px' }}>
            <h2>Liczba wydanych praw jazdy dla każdego miesiąca</h2>
            <Bar data={monthlyChartData} />
        </div>
    );
};

export default Chart3;
