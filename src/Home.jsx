import { useState, useEffect, useContext } from 'react';
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
import { SUCCESS_MESAGE, TEST_URL } from './utils/constants';

import Header from './components/Header';
import Result from './components/Result';
import Game from './Game';
import Welcome from './components/Welcome';
import Statistic from './components/Statistic';
import GameSkeleton from './components/GameSkeleton';
import UserInfo from './components/UserInfo';

import { REQUEST_TOKEN, MAIN_URL } from './utils/constants';
import { GameContext } from './context/GameContext';
import Modal from './components/Modal';
import LoginForm from './LoginForm';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { Button } from './components/ui/button';

function Home() {
  const [data, setData] = useState([]);
  const [step, setStep] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [start, setStart] = useState(true);
  const [reset, setReset] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [token, setToken] = useState('');
  const [isStatisic, setIsStatisic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { anonymous, setAnonymous, userEmail } = useContext(GameContext);

  const [user, loading, error] = useAuthState(auth);

  const API_URL = `${MAIN_URL}?amount=1&category=9&difficulty=${difficulty}&type=multiple`;

  const notifySuccess = () => toast.success('Successfully logged out');
  const notifyError = (message) => toast.error(message);

  const navigate = useNavigate();

  const resultsCollectionRef = collection(db, 'history');

  useEffect(() => {
    if (user) fetchData(); // Fetch data only when user is available
  }, [user]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const userToken = await axios.get(REQUEST_TOKEN);
      const { token, response_code, response_message } = userToken.data;

      if (response_code !== 0) {
        notifyError(response_message);
        setToken('');
        setIsLoading(false);
        return;
      }

      setToken(token);

      const res = await axios.get(`${API_URL}&token=${token}`);
      setData(res.data.results);
      setIsLoading(false);
    } catch (error) {
      notifyError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetch = async () => {
    try {
      const res = await axios.get(`${API_URL}&token=${token}`);
      setData(res.data.results);
    } catch (error) {
      notifyError(error.message);
    }
  };

  const getResults = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const q = query(
          resultsCollectionRef,
          where('userId', '==', userId),
          orderBy('date', 'asc')
        );
        const data = await getDocs(q);
        const filtredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setResults(filtredData);
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
      onReset();
      notifySuccess();
    } catch (err) {
      notifyError(err.message);
    }
  };

  const handleDifficulty = (select) => {
    setDifficulty(select);
  };

  const onStart = () => {
    setStart(false);
    setReset(false);
    setShowResult(false);
    setIsStatisic(false);
    fetchData();
  };

  const onClickAnswer = (answer) => {
    if (data[step].correct_answer === answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setTotalQuestions((total) => total + 1);
  };

  const onClickNext = async () => {
    setIsLoading(true);
    await handleFetch();
    setIsLoading(false);
  };

  const onReset = () => {
    setReset(true);
    setStep(0);
    setCorrectAnswers(0);
    setStart(true);
    setShowResult(false);
    setIsStatisic(false);
    setTotalQuestions(0);
    setAnonymous(false);
  };

  const onStatistic = async () => {
    setIsStatisic(!isStatisic);
    await getResults();
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
    if (user) {
      // If user is logged in, directly log the statistic
      logUserStatistic(correctAnswers, totalQuestions);
    } else if (anonymous) {
      // If user is anonymous, show the modal to register
      setShowModal(true);
    }
  };

  const onRegister = async () => {
    try {
      // Create user with email and password
      await sendSignInLinkToEmail(auth, userEmail, {
        url: TEST_URL,
        handleCodeInApp: true,
      });

      setShowModal(false);

      notifySuccess(SUCCESS_MESAGE);
    } catch (error) {
      notifyError('Registration error:', error.message);
    }
  };

  const quest = data && data[step];

  return (
    <div className="container mx-auto flex flex-col justify-center py-10">
      {/* {!user && <LoggedIn />} */}

      {user || anonymous ? (
        <>
          <Header />
          <div className="rounded-3xl p-5 bg-white mx-auto max-w-[500px] w-full">
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

            {!start && quest && !showResult && (user || anonymous) && (
              <>
                <UserInfo user={user} handleLogout={handleLogout} />
                <p className="mb-5">
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

                <div className="mt-5 flex justify-between items-center">
                  <Button onClick={onClickNext}>Next</Button>
                  <Button onClick={onResults}>Finish</Button>
                </div>
              </>
            )}

            {showResult && (
              <Result
                correctAnswers={correctAnswers}
                reset={reset}
                onReset={onReset}
                totalQuestions={totalQuestions}
              />
            )}
          </div>

          {showModal && <Modal onRegister={onRegister} />}
        </>
      ) : (
        <LoginForm />
      )}

      {!start && !showResult && (
        <Button variant="statistic" onClick={onStatistic}>
          {isStatisic ? 'Hide statistic' : 'Show statistic'}
        </Button>
      )}

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
