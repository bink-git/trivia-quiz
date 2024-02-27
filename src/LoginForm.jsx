import { sendSignInLinkToEmail, signInWithPopup } from 'firebase/auth';
import { auth, githubProvider, googleProvider } from './utils/firebaseConfig';
import Header from './components/Header';
import { ToastContainer, toast } from 'react-toastify';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { SUCCESS_MESAGE, TEST_URL } from './utils/constants';


const LoginForm = ({ userEmail, setUserEmail, isLoading, setIsLoading }) => {
  const notifyError = (message) => toast.error(message);
  const notifyInfo = (message) => toast.success(message);

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

    } catch (error) {
      notifyError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      notifyError(error.message);
    }
  };

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
          transition:Bounce
        />
        <Header />
        <form className="login-form" onSubmit={handleLogin}>
          <label>To start the game, enter your email, please</label>
          <input
            type="email"
            required
            placeholder="Your email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
          <button type="submit" className="btn">
            {isLoading ? 'Logging you in' : 'Login'}
          </button>
        </form>
        <div className="auth-links">
          <button className="auth-btn" onClick={signInWithGoogle}>
            <FcGoogle size={30} />
          </button>
          <button className="auth-btn" onClick={signInWithGithub}>
            <FaGithub size={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
