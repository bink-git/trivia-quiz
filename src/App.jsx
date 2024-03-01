import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Context from './context/GameContext';
import LoginForm from './LoginForm';
import Welcome from './components/Welcome';
function App() {
  return (
    <div>
      <Context>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/start" element={<Welcome />} />
          </Routes>
        </Router>
      </Context>
    </div>
  );
}
export default App;
