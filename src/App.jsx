import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/GameContext";

// import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/ui/toaster";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
function App() {
  return (
    <>
      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      /> */}
      <Toaster />

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
