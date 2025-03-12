import useVoteStore from "../store";

function VotePage() {
  const { centers, vote } = useVoteStore();

  return (
    <div className="container">
      <h1>ASAN Səsvermə</h1>
      <div className="center-list">
        {centers.map((center, index) => (
          <div key={index} className="vote-card">
            <p>{center}</p>
            <button className="vote-button" onClick={() => vote(index)}>
              Səs ver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotePage;
