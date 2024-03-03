import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./utils/firebaseConfig";
import {
  getDocs,
  collection,
  addDoc,
  orderBy,
  Timestamp,
  query,
  where,
} from "firebase/firestore";

import Result from "./pages/ResultsPage";
import Game from "./Game";
import Welcome from "./components/Welcome";
import UserHistory from "./components/UserHistory";
import GameSkeleton from "./components/GameSkeleton";
import UserInfo from "./components/UserInfo";
import LoginForm from "./LoginForm";
import GuestAuth from "./components/GuestAuth";
import { Button } from "./components/ui/button";

import { useSharedState } from "@/context/sharedContext";
import useDataFetching from "./hooks/useDataFetching";

function Home() {
  // const [isLoading, setIsLoading] = useState(true);
  const { fetchData, handleFetch } = useDataFetching();

  const {
    state: {
      data,
      anonymous,
      results,
      step,
      start,
      reset,
      correctAnswers,
      totalQuestions,
      showResults,
      isHistory,
      isLoading,
    },
    dispatch,
  } = useSharedState();

  const [user, loading, error] = useAuthState(auth);

  const notifySuccess = () => toast.success("Successfully logged out");
  const notifyError = (message) => toast.error(message);

  const navigate = useNavigate();

  const resultsCollectionRef = collection(db, "history");

  // useEffect(() => {
  //   if (user ) fetchData(); // Fetch data only when user is available
  // }, [user]);

  const getResultsFromFirestore = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const q = query(
          resultsCollectionRef,
          where("userId", "==", userId),
          orderBy("date", "asc"),
        );
        const data = await getDocs(q);
        const filtredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch({ type: "SET_RESULTS", payload: filtredData });
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
      dispatch({ type: "RESET" });
      notifySuccess();
    } catch (err) {
      notifyError(err.message);
    }
  };

  const onStart = async () => {
    console.log(data);
    dispatch({ type: "START" });
    await fetchData();
  };

  const onClickAnswer = (answer) => {
    if (data[step].correct_answer === answer) {
      dispatch({ type: "SET_CORRECT_ANSWERS", payload: correctAnswers + 1 });
    }
    dispatch({ type: "SET_TOTAL_QUESTIONS", payload: totalQuestions + 1 });
  };

  const onClickNext = async () => {
    await handleFetch();
  };

  const onHistory = async () => {
    dispatch({ type: "TOGGLE_HISTORY" });
    await getResultsFromFirestore();
  };

  const onResults = () => {
    logUserStatistic(correctAnswers, totalQuestions);
    navigate("/results");
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
        dispatch({ type: "SET_RESULTS", payload: [...results, newData] });
        await addDoc(collection(db, "history"), newData);
        dispatch({ type: "SHOW_RESULTS" });
        dispatch({ type: "HIDE_HISTORY" });
      } catch (error) {
        notifyError(error.message);
      }
    } else {
      localStorage.setItem("correctAnswers", correctAnswers);
      localStorage.setItem("totalQuestions", totalQuestions);
    }
  };

  useEffect(() => {
    const storedCorrectAnswers = localStorage.getItem("correctAnswers");
    const storedTotalQuestions = localStorage.getItem("totalQuestions");

    if (storedCorrectAnswers !== null && storedTotalQuestions !== null) {
      const correctAnswers = parseInt(storedCorrectAnswers);
      const totalQuestions = parseInt(storedTotalQuestions);

      logUserStatistic(correctAnswers, totalQuestions);
    }
  }, []);

  const showAuthModal = () => {
    setTimeout(() => {
      dispatch({ type: "SHOW_MODAL" });
    }, 2000);
  };

  const quest = data && data[step];

  return (
    <div className="container mx-auto flex flex-col justify-center py-10">
      {user || anonymous ? (
        <>
          <div className="mx-auto w-full max-w-[500px] rounded-3xl bg-white p-5">
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

            {!start && quest && !showResults && (user || anonymous) && (
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
                    onClickNext={onClickNext}
                    onClickAnswer={onClickAnswer}
                  />
                )}

                <div className="mt-5 flex items-center justify-between">
                  <Button onClick={onClickNext}>Next</Button>

                  {user ? (
                    <Button onClick={onResults}>Finish</Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          onResults();
                          showAuthModal();
                        }}
                      >
                        Finish
                      </Button>
                    </>
                  )}
                </div>
              </>
            )}

            {showResults && <Result />}
          </div>
        </>
      ) : (
        <>
          <LoginForm />
          <GuestAuth onStart={onStart} />
        </>
      )}

      {!start && !showResults && (
        <Button
          variant="statistic"
          className="mx-auto mb-10 mt-10"
          onClick={onHistory}
        >
          {isHistory ? "Hide statistic" : "Show statistic"}
        </Button>
      )}

      {error && notifyError(error.message)}

      {isHistory && <UserHistory />}
    </div>
  );
}

export default Home;
