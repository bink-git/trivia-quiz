import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Result from './Result';
import Game from './Game';
import Welcome from './Welcome';
import Statistic from './Statistic';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { API_URL, REQUEST_TOKEN, RESPONSE_CODES, MAIN_URL } from './constants';

import logo from './assets/logo.png';
import GameSkeleton from './GameSkeleton';

function App() {
  const [data, setData] = useState([]);
  const [step, setStep] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [start, setStart] = useState(true);
  const [reset, setReset] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [token, setToken] = useState('');
  const [isStatisic, setIsStatisic] = useState(false);
  const [statistic, setStatistic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');

  const API_URL = `${MAIN_URL}?amount=1&category=9&difficulty=${difficulty}&type=multiple`;

  const { code, message } = RESPONSE_CODES;

  let resCode;
  let resMessage;

  // const { code, message } = RESPONSE_CODES.find(
  //   (item) => item.code === resCode
  // );

  const notifyFetch = () => toast.error('Error fetching data');
  const notifyToken = (message) => toast.error(message);

  const handleDifficulty = (select) => {
    setDifficulty(select);
  };

  const onClickNext = async () => {
    setLoading(true);
    await handleFetch();

    setLoading(false);
  };

  const onClickAnswer = (answer) => {
    if (data[step].correct_answer === answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setTotalQuestions((total) => total + 1);
  };

  const onStart = () => {
    setStart(false);
    setReset(false);
    setShowResult(false);
    setIsStatisic(false);
    fetchData();
  };

  const onReset = () => {
    setReset(true);
    setStep(0);
    setCorrectAnswers(0);
    setStart(true);
    setShowResult(false);
    setIsStatisic(false);
    setTotalQuestions(1);
  };

  const onStatistic = () => {
    setIsStatisic(!isStatisic);
  };

  useEffect(() => {
    const storedStatistic = localStorage.getItem('quizStatistic');
    if (storedStatistic) {
      setStatistic(JSON.parse(storedStatistic));
    }
  }, []);

  const handleStatistic = () => {
    const date = new Date();
    const newData = {
      date: date.toLocaleString(),
      correctAnswers,
      totalQuestions,
    };
    setStatistic([...statistic, newData]);
    localStorage.setItem(
      'quizStatistic',
      JSON.stringify([...statistic, newData])
    );
    setShowResult(true);
    setIsStatisic(false);
  };

  const handleFetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}&token=${token}`);
      setData(res.data.results);
    } catch (error) {
      if (resCode === code) {
        notifyToken(resMessage);
        setLoading(false);
      }
    }
  };

  const fetchData = async () => {
    try {
      const userToken = await axios.get(REQUEST_TOKEN);
      const { token, response_code, response_message } = userToken.data;

      resCode = response_code;
      resMessage = response_message;

      setToken(token);

      const res = await axios.get(`${API_URL}&token=${token}`);
      setData(res.data.results);
    } catch (error) {
      if (resCode === code) {
        notifyToken(resMessage);
        setToken('');
      } else {
        notifyFetch();
      }
    } finally {
      setLoading(false);
    }
  };

  const quest = data && data[step];

  return (
    <div className="container">
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

        {start && reset && (
          <Welcome onStart={onStart} onDifficulty={handleDifficulty} />
        )}

        {!start && quest && !showResult && (
          <>
            <p className="correct">
              Correct Answers: {correctAnswers} / {totalQuestions}
            </p>
            {loading && !start ? (
              <GameSkeleton />
            ) : (
              <Game
                quest={quest}
                onClickAnswer={onClickAnswer}
                correctAnswers={correctAnswers}
                onClickNext={onClickNext}
              />
            )}

            <div className="buttons">
              <button className="next btn" onClick={onClickNext}>
                Next
              </button>
              <button className="btn" onClick={() => handleStatistic()}>
                Finish
              </button>
            </div>
          </>
        )}

        {step === data.length ||
          (showResult && (
            <Result
              correctAnswers={correctAnswers}
              reset={reset}
              onReset={onReset}
              totalQuestions={totalQuestions}
            />
          ))}
      </div>
      {!start && !showResult && (
        <button className="statistic-btn" onClick={() => onStatistic()}>
          Show statistic
        </button>
      )}

      {isStatisic && (
        <Statistic
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
          statistic={statistic}
        />
      )}
    </div>
  );
}

export default App;
