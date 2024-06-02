import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const regions = ["WOJ. DOLNOŚLĄSKIE", "WOJ. KUJAWSKO-POMORSKIE", "WOJ. LUBELSKIE", "WOJ. LUBUSKIE", "WOJ. ŁÓDZKIE", "WOJ. MAŁOPOLSKIE", "WOJ. MAZOWIECKIE", "WOJ. OPOLSKIE", "WOJ. PODKARPACKIE", "WOJ. PODLASKIE", "WOJ. POMORSKIE", "WOJ. ŚLĄSKIE", "WOJ. ŚWIĘTOKRZYSKIE", "WOJ. WARMIŃSKO-MAZURSKIE", "WOJ. WIELKOPOLSKIE", "WOJ. ZACHODNIOPOMORSKIE"];

const Table = ({ data, filters, setFilters, fetchData }) => {
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * (rowsPerPage === 'all' ? data.length : rowsPerPage);
  const endIndex = rowsPerPage === 'all' ? data.length : startIndex + rowsPerPage;

  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value
    }));
  };

  const handleShowNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleShowPreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const handleRowsPerPageChange = (event) => {
    const value = event.target.value;
    setRowsPerPage(value === 'all' ? 'all' : parseInt(value));
    setCurrentPage(0);
  };

  const handleDownload = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }
    console.log(token)
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:8888/api/data/download-json',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        params: filters,
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      const filename = `dane_prawa_jazdy_${Object.values(filters).filter(value => !!value).join('_') || ''}.json`;
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading JSON file:', error);
    }
  };

  useEffect(() => {
    fetchData();
    setCurrentPage(0);
  }, [filters]);

  return (
    <div className={styles.table_component}>
      <div className={styles.filters}>
        <label>Miesiąc:</label>
        <select className={styles.select} onChange={(e) => handleFilterChange('DATA_MC', e.target.value)} value={filters.DATA_MC}>
          <option value="">Wszystkie</option>
          <option value="2023-01">2023-01</option>
          <option value="2023-02">2023-02</option>
          <option value="2023-03">2023-03</option>
          <option value="2023-04">2023-04</option>
          <option value="2023-05">2023-05</option>
          <option value="2023-06">2023-06</option>
          <option value="2023-07">2023-07</option>
          <option value="2023-08">2023-08</option>
          <option value="2023-09">2023-09</option>
          <option value="2023-10">2023-10</option>
          <option value="2023-11">2023-11</option>
          <option value="2023-12">2023-12</option>
        </select>
        <label>Województwo:</label>
        <select className={styles.select} onChange={(e) => handleFilterChange('WOJEWODZTWO', e.target.value)} value={filters.WOJEWODZTWO}>
          <option value="">Wszystkie</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        <label>Płeć:</label>
        <select className={styles.select} onChange={(e) => handleFilterChange('PLEC', e.target.value)} value={filters.PLEC}>
          <option value="">Wszystkie</option>
          <option value="K">K</option>
          <option value="M">M</option>
        </select>
      </div>
      <div className={styles.table_controls}>
        <label htmlFor="rowsPerPage">Liczba wyników na stronie:</label>
        <select className={styles.select} id="rowsPerPage" onChange={handleRowsPerPageChange} value={rowsPerPage}>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="all">All</option>
        </select>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>DATA_MC</th>
              <th>KOD_WOJ</th>
              <th>WOJEWODZTWO</th>
              <th>PLEC</th>
              <th>WIEK</th>
              <th>LICZBA</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(startIndex, endIndex).map((item) => (
              <tr key={item.id}>
                <td>{item.DATA_MC}</td>
                <td>{item.KOD_WOJ}</td>
                <td>{item.WOJEWODZTWO}</td>
                <td>{item.PLEC}</td>
                <td>{item.WIEK}</td>
                <td>{item.LICZBA}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.arrow_btn}
          onClick={handleShowPreviousPage}
          disabled={currentPage === 0}
        >
          &#8592;
        </button>
        <button
          className={styles.arrow_btn}
          onClick={handleShowNextPage}
          disabled={endIndex >= data.length}
        >
          &#8594;
        </button>
      </div>
      <div className={styles.download_button}>
        <button className={styles.black_btn} onClick={handleDownload}>
          Pobierz powyższe dane
        </button>
      </div>
    </div>
  );
};

export default Table;
