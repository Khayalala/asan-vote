import { useEffect } from "react";
import useVoteStore from "../store";
import "../App.css";

function Results() {
  const { centers, votes, fetchVotes } = useVoteStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchVotes();
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>📊 Səsvermə Nəticələri</h1>
      <ul className="results-list">
        {centers.map((center, index) => (
          <li key={index} className="result-item">
            <strong>{center}</strong>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${votes[index] * 5}px` }}
              ></div>
            </div>
            <span>{votes[index]} səs</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
