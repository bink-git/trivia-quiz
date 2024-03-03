import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "@/utils/firebaseConfig";
import { isSignInWithEmailLink } from "firebase/auth";
import {
  useAuthState,
  useSignInWithEmailLink,
  useSendSignInLinkToEmail,
} from "react-firebase-hooks/auth";
import { TEST_URL } from "@/utils/constants";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useSharedState } from "@/context/sharedContext";

const EmailAuth = () => {
  const { state, dispatch } = useSharedState();

  const { search } = useLocation();
  const navigate = useNavigate();

  const notifyError = (message) => toast.error(message);
  const notifyInfo = (message) => toast.success(message);

  const [user, loading, error] = useAuthState(auth);
  const [sendSignInLinkToEmail, sending] = useSendSignInLinkToEmail(auth);
  const [signInWithEmailLink] = useSignInWithEmailLink(auth);

  const actionCodeSettings = {
    url: TEST_URL,
    handleCodeInApp: true,
  };

  useEffect(() => {
    const authenticateUser = async () => {
      if (user) {
        navigate("/");
        dispatch({ type: "DISABLE_ANONYMOUS" });
        return;
      }

      if (isSignInWithEmailLink(auth, window.location.href)) {
        let emailFromStorage = localStorage.getItem("email");

        try {
          await signInWithEmailLink(
            auth,
            emailFromStorage,
            window.location.href,
          );
          localStorage.removeItem("email");
          navigate("/");
        } catch (error) {
          notifyError(error.message);
          navigate("/login");
        }
      }
    };
    authenticateUser();
  }, [user, search, navigate]);

  if (error) {
    notifyError(error.message);
  }

  if (sending) {
    return <p>Sending...</p>;
  }

  if (loading) {
    return <Loader />;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const success = await sendSignInLinkToEmail(
        state.userEmail,
        actionCodeSettings,
      );
      localStorage.setItem("email", state.userEmail);
      if (success) {
        notifyInfo("Check your email for the sign-in link");
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div className="mb-10 flex w-full max-w-sm flex-col items-center gap-4">
      <Input
        type="email"
        required
        placeholder="Your email"
        value={state.userEmail}
        onChange={(e) =>
          dispatch({ type: "SET_USER_EMAIL", payload: e.target.value })
        }
        className="rounded-2xl border-2 border-background bg-slate-50 p-6 text-xl outline-none focus-visible:ring-slate-300"
      />
      <Button type="submit" variant="default" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default EmailAuth;
