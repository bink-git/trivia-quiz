import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./utils/firebaseConfig";

import Result from "./pages/ResultsPage";
import Game from "./Game";
import WelcomePage from "./pages/WelcomePage";
import UserHistory from "./components/UserHistory";
import GameSkeleton from "./components/GameSkeleton";
import LoginPage from "./pages/LoginPage";
import { Button } from "./components/ui/button";

import { useSharedState } from "@/context/sharedContext";

function Home() {
  const {
    state: {
      data,
      anonymous,
      results,
      step,
      start,
      reset,
      showResults,
      isLoading,
    },
    dispatch,
  } = useSharedState();

  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);

  const notifyError = (message) => toast.error(message);

  // useEffect(() => {
  //   if (user ) fetchData(); // Fetch data only when user is available
  // }, [user]);

  const quest = data && data[step];

  return (
    <div className="container mx-auto flex flex-col justify-center py-10">
      {user || anonymous ? (
        <>
          <div className="mx-auto w-full max-w-[500px] rounded-3xl bg-white p-5">
            {start && reset && <WelcomePage />}

            {!start && quest && !showResults && (user || anonymous) && (
              <>
                {isLoading && !start ? (
                  <GameSkeleton />
                ) : (
                  <Game quest={quest} />
                )}
              </>
            )}

            {showResults && <Result />}
          </div>
        </>
      ) : (
        <>
          <LoginPage />
        </>
      )}

      {error && notifyError(error.message)}
    </div>
  );
}

export default Home;
