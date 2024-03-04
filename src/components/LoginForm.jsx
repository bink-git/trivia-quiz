/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { auth } from "../utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

import Loader from "./Loader";
import { toast } from "react-toastify";

import { SUCCESS_MESAGE, TEST_URL } from "../utils/constants";
import GoogleAuth from "./GoogleAuth";
import GithubAuth from "./GithubAuth";
import EmailAuth from "./EmailAuth";
import { useSharedState } from "@/context/sharedContext";

const LoginForm = () => {
  const { dispatch } = useSharedState();
  const [user, loading] = useAuthState(auth);
  const { search } = useLocation();
  const navigate = useNavigate();

  const notifyError = (message) => toast.error(message);

  useEffect(() => {
    const authenticateUser = async () => {
      if (user) {
        navigate("/welcome");
        dispatch({ type: "DISABLE_ANONYMOUS" });
        return;
      }

      if (isSignInWithEmailLink(auth, window.location.href)) {
        let emailFromStorage = localStorage.getItem("email");
        dispatch({ type: "LOADING_TRUE" });
        try {
          await signInWithEmailLink(
            auth,
            emailFromStorage,
            window.location.href,
          );
          localStorage.removeItem("email");
          navigate("/welcome");
        } catch (error) {
          notifyError(error.message);
          navigate("/login");
        } finally {
          dispatch({ type: "LOADING_FALSE" });
        }
      }
    };
    authenticateUser();
  }, [user, search, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="container flex w-full flex-1 flex-col items-center justify-center">
        <EmailAuth />
        <div className="flex gap-5">
          <GoogleAuth />
          <GithubAuth />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
