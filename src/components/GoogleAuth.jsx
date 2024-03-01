import { auth, googleProvider } from '../utils/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/button';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Loader } from 'lucide-react';

// const GoogleAuth = () => {
//   const notifyError = (message) => toast.error(message);
//   const signInWithGoogle = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (error) {
//       notifyError(error.message);
//     }
//   };

//   return (
//     <Button variant="secondary" size="auth" onClick={signInWithGoogle}>
//       <FcGoogle size={30} />
//     </Button>
//   );
// };

const GoogleAuth = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const notifyError = (message) => toast.error(message);

  if (error) {
    notifyError(error.message);
  }

  if (loading) {
    return <Loader className="animate-spin text-white " />;
  }

  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
      </div>
    );
  }

  // const signInWithGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth, googleProvider);
  //   } catch (error) {
  //     notifyError(error.message);
  //   }
  // };

  return (
    <Button variant="secondary" size="auth" onClick={() => signInWithGoogle()}>
      <FcGoogle size={30} />
    </Button>
  );
};

export default GoogleAuth;
