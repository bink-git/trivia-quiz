import { useEffect } from "react";

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
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PREFETCHED_STEP } from "@/utils/constants";

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

  const [user] = useAuthState(auth);

  const onClickNext = async () => {
    dispatch({ type: "SET_STEP", payload: step + 1 });
    if (step + PREFETCHED_STEP === data.length) {
      await handleFetch();
    }
  };

  const onResults = () => {
    logUserHistory(correctAnswers, totalQuestions);
    navigate("/results");
  };

  const logUserHistory = async (correctAnswers, totalQuestions) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const date = Timestamp.fromDate(new Date());
        const newData = {
          userId: currentUser.uid,
          correctAnswers,
          totalQuestions,
          date,
        };
        dispatch({ type: "SET_RESULTS", payload: [...results, newData] });
        await addDoc(collection(db, "history"), newData);
        dispatch({ type: "SHOW_RESULTS" });
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

    if (user) {
      localStorage.removeItem("correctAnswers");
      localStorage.removeItem("totalQuestions");
    }
  }, [correctAnswers, totalQuestions]);

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
            <CardContent>{isLoading ? <GameSkeleton /> : <Game />}</CardContent>
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
                      dispatch({ type: "SHOW_REGISTER_MODAL" });
                    }}
                  >
                    Finish
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
          {user && <UserHistory />}
        </>
      )}
    </>
  );
};

export default GamePage;
