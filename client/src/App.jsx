import React, { useEffect } from "react";
import useVoteStore from "./store";
import "./App.css";
import samani from "./assets/samani.webp";

function App() {
  const { centers, votes, hasVoted, fetchVotes } = useVoteStore();

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <div className="container">
      <div
        className="novruz-banner"
        style={{ backgroundImage: `url(${samani})` }}
      ></div>
      <h1>🌿 ASAN Səsvermə 🌸</h1>

      {hasVoted ? (
        <div className="card results-card">
          <h2>Siz artıq səs vermisiniz!</h2>
          <p>✨ Hazırki nəticələr ✨</p>
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
      ) : (
        <div>
          <h2>🎉 Səs verin! 🎉</h2>
          <div className="center-list">
            {centers.map((center, index) => (
              <div key={index} className="vote-card">
                <p>{center}</p>
                <button
                  className="vote-button"
                  onClick={() => useVoteStore.getState().vote(index)}
                >
                  ✅ Səs ver
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
