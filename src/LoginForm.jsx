/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { auth } from './utils/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';

import Header from './components/Header';
import Loader from './components/Loader';
import { ToastContainer, toast } from 'react-toastify';

import { SUCCESS_MESAGE, TEST_URL } from './utils/constants';
import { GameContext } from './context/GameContext';
import GoogleAuth from './components/GoogleAuth';
import GithubAuth from './components/GithubAuth';
import { Button } from './components/ui/button';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAnonymous, userEmail, setUserEmail } = useContext(GameContext);

  const [user] = useAuthState(auth);

  const { search } = useLocation();
  const navigate = useNavigate();

  const notifyError = (message) => toast.error(message);
  const notifyInfo = (message) => toast.success(message);

  useEffect(() => {
    const authenticateUser = async () => {
      if (user) {
        navigate('/');
        setAnonymous(false);
        return;
      }
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let emailFromStorage = localStorage.getItem('email');
        setIsLoading(true);
        try {
          await signInWithEmailLink(
            auth,
            emailFromStorage,
            window.location.href
          );
          localStorage.removeItem('email');
          navigate('/');
        } catch (error) {
          notifyError(error.message);
          navigate('/login');
        } finally {
          setIsLoading(false);
        }
      }
    };
    authenticateUser();
  }, [user, search, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await sendSignInLinkToEmail(auth, userEmail, {
        url: TEST_URL,
        handleCodeInApp: true,
      });
      localStorage.setItem('email', userEmail);
      notifyInfo(SUCCESS_MESAGE);
      setIsLoading(false);
    } catch (error) {
      notifyError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container w-full flex-1 flex flex-col justify-center items-center">
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

        <Header />

        {isLoading && <Loader />}

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <label className="text-lg text-center text-white">
            To start the game, enter your email, please
          </label>
          <input
            type="email"
            required
            placeholder="Your email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            className="border-2 border-background text-xl outline-none p-4 rounded-2xl"
          />
          <Button type="submit">
            {isLoading ? 'Logging you in' : 'Login'}
          </Button>
        </form>

        <div className="flex gap-5 mt-4">
          <GoogleAuth />
          <GithubAuth />
        </div>

        <div className="flex flex-col items-center mt-10">
          <div className="relative w-full flex justify-center items-center mb-10">
            <hr className="w-full" />
            <span className="absolute px-5 text-white text-center bg-background">
              OR
            </span>
          </div>
          <Button onClick={() => setAnonymous(true)}>
            Play without logging in
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
