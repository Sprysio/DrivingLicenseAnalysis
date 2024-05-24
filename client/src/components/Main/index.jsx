import { useEffect, useState } from "react"
import axios from "axios";
import styles from "./styles.module.css"
const Main = () => {
    const [data,setData] = useState([]);
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    useEffect(()=>{
        const fetchData = async() =>{
            const token = localStorage.getItem("token")
            if(!token){
                console.log("no token found")
                return;
            }
            try{
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:8888/api/data',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                })
                setData(response.data)
            }catch(error){
                console.log(error)
            }
            
        }
        fetchData()
    },[])
    return (
        <div className={styles.main_container}>
          <nav className={styles.navbar}>
            <h1>MySite</h1>
            <button className={styles.white_btn} onClick={handleLogout}>
              Logout
            </button>
          </nav>
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
                {data.map((item) => (
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
        </div>
      );
}
export default Main
