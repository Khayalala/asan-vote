import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import useVoteStore from "./store";
import "./App.css";
import samani from "./assets/samani.webp";
import VotePage from "./Pages/VotePage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import Results from "./Pages/Results";

function AppContent() {
  const { hasVoted, checkIfVoted } = useVoteStore();
  const location = useLocation();
  const [loading, setLoading] = React.useState(true); //

  useEffect(() => {
    checkIfVoted().finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <div className="container">
      {/* Show banner ONLY if NOT on results page */}
      {location.pathname !== "/results" && (
        <div
          className="novruz-banner"
          style={{ backgroundImage: `url(${samani})` }}
        ></div>
      )}

      <Routes>
        <Route
          path="/"
          element={hasVoted ? <ConfirmationPage /> : <VotePage />}
        />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
