import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import LoggedIn from './LoggedIn';
function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoggedIn />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
