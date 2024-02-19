import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './utils/firebaseConfig';
import {
  getDocs,
  collection,
  addDoc,
  orderBy,
  Timestamp,
  query,
  where,
} from 'firebase/firestore';

import Header from './components/Header';
import Result from './components/Result';
import Game from './Game';
import Welcome from './components/Welcome';
import Statistic from './components/Statistic';
import GameSkeleton from './components/GameSkeleton';
import Loader from './components/Loader';
import UserInfo from './components/UserInfo';
import LoggedIn from './LoggedIn';

import { REQUEST_TOKEN, RESPONSE_CODES, MAIN_URL } from './utils/constants';

function Home() {
  const [data, setData] = useState([]);
  const [step, setStep] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [start, setStart] = useState(true);
  const [reset, setReset] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [token, setToken] = useState('');
  const [isStatisic, setIsStatisic] = useState(false);
  const [statistic, setStatistic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [results, setResults] = useState([]);

  const API_URL = `${MAIN_URL}?amount=1&category=9&difficulty=${difficulty}&type=multiple`;

  const { code } = RESPONSE_CODES;

  let resCode;
  let resMessage;

  const notifyFetch = () => toast.error('Error fetching data');
  const notifySuccess = () => toast.success('Successfully logged out');
  const notifyError = (message) => toast.error(message);

  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const resultsCollectionRef = collection(db, 'history');

  useEffect(() => {
    const getResults = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const q = query(
            resultsCollectionRef,
            where('userId', '==', userId),
            orderBy('date', 'desc')
          );
          const data = await getDocs(q);
          const filtredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setResults(filtredData);
          console.log(filtredData);
        }
      } catch (error) {
        notifyError(error.message);
      }
    };

    getResults();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      notifySuccess();
      navigate('/');
    } catch (err) {
      notifyError(err.message);
    }
  };

  const handleDifficulty = (select) => {
    setDifficulty(select);
  };

  const onClickNext = async () => {
    setIsLoading(true);
    await handleFetch();
    setIsLoading(false);
  };

  const onClickAnswer = (answer) => {
    if (data[step].correct_answer === answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setTotalQuestions((total) => total + 1);
  };

  const onStart = async () => {
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

  const logUserStatistic = async (correctAnswers, totalQuestions) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const date = Timestamp.fromDate(new Date());
        const newData = {
          userId: user.uid,
          correctAnswers,
          totalQuestions,
          date,
        };
        setResults([...results, newData]);
        await addDoc(collection(db, 'history'), newData);
        setShowResult(true);
        setIsStatisic(false);
      } catch (error) {
        notifyError(error.message);
      }
    }
  };

  const onResults = async () => {
    logUserStatistic(correctAnswers, totalQuestions);
  };

  const handleFetch = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}&token=${token}`);
      setData(res.data.results);
    } catch (error) {
      if (resCode === code) {
        notifyError(resMessage);
        setIsLoading(false);
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
        notifyError(resMessage);
        setToken('');
      } else {
        notifyFetch();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const quest = data && data[step];

  return (
    <div className="container">
      {user ? (
        <>
          <Header />

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
                <UserInfo user={user} handleLogout={handleLogout} />
                <p className="correct">
                  Correct Answers: {correctAnswers} / {totalQuestions}
                </p>
                {isLoading && !start ? (
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
                  <button className="btn" onClick={() => onResults()}>
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
        </>
      ) : (
        <LoggedIn />
      )}

      {!start && !showResult && (
        <button className="statistic-btn" onClick={() => onStatistic()}>
          Show statistic
        </button>
      )}

      {loading && <Loader />}

      {error && notifyError(error.message)}

      {isStatisic && (
        <Statistic
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
          results={results}
        />
      )}
    </div>
  );
}

export default Home;
