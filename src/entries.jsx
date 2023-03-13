import { useEffect, useState } from "react";
import "./entries.css";
function Entries() {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const lastIndex = currentPage * entriesPerPage;
  const firstIndex = lastIndex - entriesPerPage;
  const records = entries.slice(firstIndex, lastIndex);
  const numberOfPage = Math.ceil(entries.length / entriesPerPage);
  const numbers = [1, 2, 3, 4, 5];

  useEffect(() => {
    fetch("https://api.publicapis.org/entries")
      .then((response) => response.json())
      .then((data) => {
        setEntries(data.entries);
      });
  }, []);

  return (
    <div className="data">
      <table className="table">
        <tr>
          <th>Api</th>
          <th>Description</th>
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

  function changeCurrentPage(n) {
    setCurrentPage(currentPage + n);
  }
}

export default Entries;
