import LoginForm from '../LoginForm';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { TEST_URL } from '../utils/constants';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const Modal = ({ onRegister }) => {
  const { userEmail } = useContext(GameContext);
  const registerUser = async () => {
    try {
      await sendSignInLinkToEmail(auth, userEmail, {
        url: TEST_URL,
        handleCodeInApp: true,
      });
      localStorage.setItem('email', userEmail);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      // Perform registration logic
      await registerUser(); // Example function for registering user

      // Call onRegister function passed from props
      onRegister();
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div>
      <LoginForm handleRegistration={handleRegistration} />
    </div>
  );
};

export default Modal;
