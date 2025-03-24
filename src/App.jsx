import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/GameContext";

import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          success: {
            duration: 3000,
            style: {
              background: "#19b44d",
              color: "#fff",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#dd352f",
              color: "#fff",
            },
          },
        }}
      />

      <div className="container mx-auto flex flex-col justify-center py-10">
        <Header />
        <Context>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </Router>
        </Context>
      </div>
    </>
  );
}
export default App;
