import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from './utils/firebaseConfig';
import Header from './components/Header';
import { ToastContainer, toast } from 'react-toastify';

const LoginForm = ({ userEmail, setUserEmail, isLoading, setIsLoading }) => {
  const notifyError = (message) => toast.error(message);
  const notifyInfo = (message) => toast.success(message);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await sendSignInLinkToEmail(auth, userEmail, {
        url: 'https://trivia-quiz-firebase-history.vercel.app/',
        handleCodeInApp: true,
      });
      localStorage.setItem('email', userEmail);
      notifyInfo('We have sent you an email with a link to sign in');
    } catch (error) {
      notifyError(error.message);
    } finally {
      setIsLoading(false);
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
      </div>
    </>
  );
};

export default LoginForm;
