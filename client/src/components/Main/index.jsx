import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Table from './Table';

const Main = () => {
  const [data, setData] = useState([]);
  const [dataCharts, setDataCharts] = useState([]);
  const [isFetched, setisFetched] = useState(false);
  const [filters, setFilters] = useState({ DATA_MC: '', WOJEWODZTWO: '', PLEC: '' });
  const [view, setView] = useState('table');

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no token found");
      return;
    }
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:8888/api/data',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        params: filters,
      });
      setData(response.data);
      if (!isFetched) {
        setDataCharts(response.data);
        setisFetched(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Nowe prawa jazdy wydane w 2023 roku</h1>
        
        <button  className={styles.white_btn} onClick={() => setView('table')}>Pokaż Tabelę</button>
        <button className={styles.white_btn} onClick={() => setView('charts')}>Pokaż Wykresy</button>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
        
     
      {view === 'table' ? (
        <Table
          data={data}
          filters={filters}
          setFilters={setFilters}
          fetchData={fetchData}
        />
      ) : (
        <div className={styles.charts_container}>
          <Chart1 data={dataCharts} />
          <Chart2 data={dataCharts} />
          <Chart3 data={dataCharts} />
        </div>
      )}
    </div>
  );
};

export default Main;
