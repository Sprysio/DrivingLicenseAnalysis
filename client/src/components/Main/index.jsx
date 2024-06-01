import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Chart from "./Chart"; 

const Main = () => {
  const [data, setData] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(100)
  const [currentPage, setCurrentPage] = useState(0)
  const [filters, setFilters] = useState({ DATA_MC: '', WOJEWODZTWO: '', PLEC: '' })

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  const fetchData = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.log("no token found")
      return
    }
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:8888/api/data',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        params: filters,
      })
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    setCurrentPage(0)
  }, [filters])

  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value
    }))
  }

  const handleDownload = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        console.log("No token found")
        return
    }

    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:8888/api/data/download-json',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token },
            params: filters,
            responseType: 'blob',
        })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        const filename = `dane_prawa_jazdy_${Object.values(filters).filter(value => !!value).join('_') || ''}.json`
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
    } catch (error) {
        console.error('Error downloading JSON file:', error)
    }
}

  const handleShowNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handleShowPreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0))
  }

  const handleRowsPerPageChange = (event) => {
    const value = event.target.value
    setRowsPerPage(value === 'all' ? 'all' : parseInt(value))
    setCurrentPage(0)
  }

  const startIndex = currentPage * (rowsPerPage === 'all' ? data.length : rowsPerPage)
  const endIndex = rowsPerPage === 'all' ? data.length : startIndex + rowsPerPage

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>MySite</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.filters}>
        <label>Miesiąc:</label>
        <select onChange={(e) => handleFilterChange('DATA_MC', e.target.value)} value={filters.DATA_MC}>
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
        <select onChange={(e) => handleFilterChange('WOJEWODZTWO', e.target.value)} value={filters.WOJEWODZTWO}>
          <option value="">Wszystkie</option>
          <option value="WOJ. DOLNOŚLĄSKIE">WOJ. DOLNOŚLĄSKIE</option>
          <option value="WOJ. KUJAWSKO-POMORSKIE">WOJ. KUJAWSKO-POMORSKIE</option>
          <option value="WOJ. LUBELSKIE">WOJ. LUBELSKIE</option>
          <option value="WOJ. LUBUSKIE">WOJ. LUBUSKIE</option>
          <option value="WOJ. ŁÓDZKIE">WOJ. ŁÓDZKIE</option>
          <option value="WOJ. MAŁOPOLSKIE">WOJ. MAŁOPOLSKIE</option>
          <option value="WOJ. MAZOWIECKIE">WOJ. MAZOWIECKIE</option>
          <option value="WOJ. OPOLSKIE">WOJ. OPOLSKIE</option>
          <option value="WOJ. PODKARPACKIE">WOJ. PODKARPACKIE</option>
          <option value="WOJ. PODLASKIE">WOJ. PODLASKIE</option>
          <option value="WOJ. POMORSKIE">WOJ. POMORSKIE</option>
          <option value="WOJ. ŚLĄSKIE">WOJ. ŚLĄSKIE</option>
          <option value="WOJ. ŚWIĘTOKRZYSKIE">WOJ. ŚWIĘTOKRZYSKIE</option>
          <option value="WOJ. WARMIŃSKO-MAZURSKIE">WOJ. WARMIŃSKO-MAZURSKIE</option>
          <option value="WOJ. WIELKOPOLSKIE">WOJ. WIELKOPOLSKIE</option>
          <option value="WOJ. ZACHODNIOPOMORSKIE">WOJ. ZACHODNIOPOMORSKIE</option>

        </select>
        <label>Płeć:</label>
        <select onChange={(e) => handleFilterChange('PLEC', e.target.value)} value={filters.PLEC}>
          <option value="">Wszystkie</option>
          <option value="K">K</option>
          <option value="M">M</option>
        </select>
      </div>
      <div className={styles.table_controls}>
        <label htmlFor="rowsPerPage">Liczba wyników na stronie:</label>
        <select id="rowsPerPage" onChange={handleRowsPerPageChange} value={rowsPerPage}>
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
                <button className={styles.white_btn} onClick={handleDownload}>
                    Pobierz powyższe dane
                </button>
            </div>
        <Chart data={data} />

        </div>

       
    );
};

export default Main
