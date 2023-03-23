import { useEffect, useState } from "react";
import "./entries.css";
function Entries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const lastIndex = currentPage * entriesPerPage;
  const firstIndex = lastIndex - entriesPerPage;
  const records = entries.slice(firstIndex, lastIndex);

  useEffect(() => {
    fetch("https://api.publicapis.org/entries")
      .then((response) => response.json())
      .then((data) => {
        setEntries(data.entries);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, []);

  if (loading) {
    return <div>Loading........</div>;
  }
  function changeCurrentPage(n) {
    setCurrentPage(currentPage + n);
  }
  function sortAssending() {
    entries.sort((a, b) => a.Description.localeCompare(b.Description));
    setEntries([...entries]);
  }
  function sortDescending() {
    entries.sort((a, b) => b.Description.localeCompare(a.Description));
    setEntries([...entries]);
  }
  return (
    <div className="data">
      <table className="table">
        <tr>
          <th>Api</th>
          <th>
            <div>Description</div>
            <div>
              <button onClick={sortAssending}>sort assending</button>
              <button onClick={sortDescending}>sort descending</button>
            </div>
          </th>
          <th>Category</th>
        </tr>
        <tbody>
          {records.map((entry, index) => (
            <tr>
              <td>{entry.API}</td>
              <td>{entry.Description}</td>
              <td>{entry.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button href="#" onClick={() => changeCurrentPage(-1)}>
          PREVIOUS
        </button>
        <button href="#" onClick={() => changeCurrentPage(1)}>
          NEXT
        </button>
      </div>
    </div>
  );
}
export default Entries;
