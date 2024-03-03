import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./HomePage";
import { Context } from "./context/GameContext";
import Welcome from "./components/Welcome";
import LoginPage from "./pages/LoginPage";
import Result from "./pages/ResultsPage";
import Header from "./components/Header";
function App() {
  return (
    <div className="container mx-auto flex flex-col justify-center py-10">
      <Header />
      <Context>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/start" element={<Welcome />} />
            <Route path="/results" element={<Result />} />
          </Routes>
        </Router>
      </Context>
    </div>
  );
}
export default App;
