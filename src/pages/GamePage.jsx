import Game from "@/components/Game";
import GameSkeleton from "@/components/GameSkeleton";
import UserHistory from "@/components/UserHistory";
import UserInfo from "@/components/UserInfo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSharedState } from "@/context/sharedContext";
import useDataFetching from "@/hooks/useDataFetching";
import { auth, db } from "@/utils/firebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GamePage = () => {
  const {
    state: {
      data,
      anonymous,
      results,
      step,
      correctAnswers,
      totalQuestions,
      isLoading,
    },
    dispatch,
  } = useSharedState();

  const { handleFetch } = useDataFetching();

  const navigate = useNavigate();
  const notifyError = (message) => toast.error(message);
  // const quest = data && data[step];
  const quest = data[step];

  const [user, loading, error] = useAuthState(auth);

  const onClickNext = async () => {
    dispatch({ type: "SET_STEP", payload: step + 1 });

    if (step + 1 >= data.length) {
      dispatch({ type: "SET_STEP", payload: 0 });
      await handleFetch();
    }
  };

  const onResults = () => {
    logUserHistory(correctAnswers, totalQuestions);
    navigate("/results");
  };

  const logUserHistory = async (correctAnswers, totalQuestions) => {
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

      logUserHistory(correctAnswers, totalQuestions);
    }
  }, []);

  const showAuthModal = () => {
    setTimeout(() => {
      dispatch({ type: "SHOW_MODAL" });
    }, 2000);
  };

  return (
    <>
      {(user || anonymous) && (
        <>
          <Card className="mx-auto w-full max-w-[500px] rounded-3xl bg-white ">
            <CardHeader>
              <UserInfo user={user} />
              <p className="mb-5 text-lg">
                Correct Answers: {correctAnswers} / {totalQuestions}
              </p>
            </CardHeader>
            <CardContent>
              {isLoading ? <GameSkeleton /> : <Game quest={quest} />}
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Button onClick={onClickNext} disabled={isLoading}>
                Next
              </Button>

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
            </CardFooter>
          </Card>
          {!anonymous && <UserHistory />}
        </>
      )}
    </>
  );
};

export default GamePage;
