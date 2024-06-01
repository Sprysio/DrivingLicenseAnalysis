import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Main = () => {
    const [data, setData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(100); // Domyślna liczba wierszy na stronę
    const [currentPage, setCurrentPage] = useState(0); // Obecna strona

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    useEffect(() => {
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
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleDownload = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found");
            return;
        }

        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:8888/api/data/download-json',
                headers: { 'Content-Type': 'application/json', 'x-access-token': token },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'nowe_prawa_jazdy.json');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading JSON file:', error);
        }
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
        setCurrentPage(0); // Reset current page to 0
    };

    const startIndex = currentPage * (rowsPerPage === 'all' ? data.length : rowsPerPage);
    const endIndex = rowsPerPage === 'all' ? data.length : startIndex + rowsPerPage;

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>MySite</h1>
                <button className={styles.white_btn} onClick={handleDownload}>
                    Download data
                </button>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <div className={styles.table_controls}>
                <label htmlFor="rowsPerPage">Rows per page:</label>
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
        </div>
    );
};

export default Main;
