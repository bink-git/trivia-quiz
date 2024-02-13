import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from './utils/firebaseConfig';
import Header from './components/Header';

const LoginForm = ({
  userEmail,
  setUserEmail,
  isLoading,
  setIsLoading,
  errorMessage,
  setErrorMessage,
  setInfoMessage,
  infoMessage,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await sendSignInLinkToEmail(auth, userEmail, {
        url: 'https://trivia-quiz-develop.vercel.app/',
        handleCodeInApp: true,
      });
      localStorage.setItem('email', userEmail);
      setInfoMessage('We have sent you an email with a link to sign in');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
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
          <button type="submit" className="btn btn-success btn-md">
            {isLoading ? 'Logging you in' : 'Login'}
          </button>
          {errorMessage && <div className="error-msg">{errorMessage}</div>}
          {infoMessage && <div className="info-msg">{infoMessage}</div>}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
