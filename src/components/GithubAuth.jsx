import { auth, githubProvider } from '../utils/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaGithub } from 'react-icons/fa';
import { Button } from './ui/button';

const GithubAuth = () => {
  const notifyError = (message) => toast.error(message);

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <Button
      variant="secondary"
      className="text-slate-800 "
      size="auth"
      onClick={signInWithGithub}
    >
      <FaGithub size={30} />
    </Button>
  );
};

export default GithubAuth;
