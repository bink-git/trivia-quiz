import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { sendSignInLinkToEmail } from "firebase/auth";
import { auth, db } from "@/utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { SUCCESS_MESAGE, TEST_URL } from "@/utils/constants";
import { toast } from "react-toastify";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useSharedState } from "@/context/sharedContext";
import { Input } from "@/components/ui/input";
import GoogleAuth from "@/components/GoogleAuth";
import GithubAuth from "@/components/GithubAuth";

function ResultsPage() {
  const navigate = useNavigate();
  const {
    state: { showModal, correctAnswers, totalQuestions, userEmail, results },
    dispatch,
  } = useSharedState();

  const [user, loading, error] = useAuthState(auth);

  const notifyInfo = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

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
      } catch (error) {
        notifyError(error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch({ type: "RESET_GAME" });
      navigate("/");
    } catch (err) {
      notifyError(err.message);
    }
  };

  const onRegister = async () => {
    try {
      const success = await sendSignInLinkToEmail(auth, userEmail, {
        url: TEST_URL,
        handleCodeInApp: true,
      });
      localStorage.setItem("email", userEmail);
      if (success) {
        notifyInfo(SUCCESS_MESAGE);
        logUserStatistic(correctAnswers, totalQuestions);
        dispatch({ type: "DISABLE_ANONYMOUS" });
      }
      dispatch({ type: "HIDE_MODAL" });
    } catch (error) {
      notifyError("Registration error:", error.message);
    } finally {
      navigate("/results");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto flex max-w-[500px] items-center justify-center rounded-3xl bg-white p-5">
        <div className="text-center text-xl font-bold">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
            className="mx-auto w-[120px]"
          />
          <h2 className="mt-5">Congrats!</h2>
          <p className="mb-5 mt-5">
            You answered {correctAnswers} of {totalQuestions} questions
          </p>
          <div className="flex justify-center gap-5">
            <Button
              onClick={() => {
                navigate("/welcome");
                dispatch({ type: "RESET_SCORES" });
              }}
            >
              Try again
            </Button>
            {user ? (
              <Button onClick={handleLogout}>Quit the game</Button>
            ) : (
              <Button
                onClick={() => {
                  dispatch({ type: "RESET_GAME" });
                  navigate("/");
                }}
              >
                Quit the game
              </Button>
            )}
          </div>
          <Dialog
            open={showModal}
            onOpenChange={() => dispatch({ type: "HIDE_MODAL" })}
          >
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="mt-10 text-center text-lg  text-white">
                  For saving your results register by email or soscial links
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  type="email"
                  required
                  placeholder="Your email"
                  value={userEmail}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_USER_EMAIL",
                      payload: e.target.value,
                    })
                  }
                  className="rounded-2xl border-2 border-background bg-slate-50 p-6 text-xl outline-none focus-visible:ring-slate-300"
                />
                <Button type="submit" onClick={onRegister} className="mx-auto">
                  Register
                </Button>
                <div className="mx-auto mt-5 flex gap-5">
                  <GoogleAuth />
                  <GithubAuth />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
