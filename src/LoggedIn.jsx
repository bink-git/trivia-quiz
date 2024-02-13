import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import LoginForm from './LoginForm';

const LoggedIn = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    const authenticateUser = async () => {
      if (user) {
        navigate('/');
        return;
      }
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let emailFromStorage = localStorage.getItem('email');
        if (!emailFromStorage) {
          emailFromStorage = window.prompt('Please provide your email');
        }

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
          setErrorMessage(error.message);
          navigate('/login');
        } finally {
          setIsLoading(false);
        }
      }
    };
    authenticateUser();
  }, [user, search, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="box">
      {user ? (
        <div>Please wait...</div>
      ) : (
        <LoginForm
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setInfoMessage={setInfoMessage}
          infoMessage={infoMessage}
        />
      )}
    </div>
  );
};

export default LoggedIn;
