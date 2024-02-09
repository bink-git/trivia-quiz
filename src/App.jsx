import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Result from './Result';
import Game from './Game';
import Welcome from './Welcome';

import { API_URL } from './constants';

import logo from './assets/logo.png';

function App() {
  const [data, setData] = useState([]);
  const [step, setStep] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [start, setStart] = useState(true);
  const [reset, setReset] = useState(true);

  const notify = () => toast.error('Error fetching data');

  const onClickNext = () => {
    setStep(step + 1);
  };

  const onClickAnswer = (answer) => {
    if (data[step].correct_answer === answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const onStart = () => {
    setStart(false);
    setReset(false);
  };

  const onReset = () => {
    setReset(true);
    setStep(0);
    setCorrectAnswers(0);
    setStart(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        setData(res.data.results);
      } catch (error) {
        notify();
      }
    };

    fetchData();
  }, []);

  const quest = data && data[step];

  return (
    <>
      <header>
        <img src={logo} alt="logo" className="logo" />
      </header>
      <div className="App">
        <ToastContainer
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
        />

        {start && reset && <Welcome onStart={onStart} />}
        {!start && quest && (
          <>
            <p className="quest-step">
              Question: {step + 1} / {data.length}
            </p>

            <Game
              quest={quest}
              onClickAnswer={onClickAnswer}
              correctAnswers={correctAnswers}
              onClickNext={onClickNext}
            />
            <button className="next" onClick={onClickNext}>
              {step === data.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
          </>
        )}

        {step === data.length && (
          <Result
            correctAnswers={correctAnswers}
            reset={reset}
            onReset={onReset}
          />
        )}
      </div>
    </>
  );
}

export default App;
