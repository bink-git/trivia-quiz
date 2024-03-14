import { auth, githubProvider } from "../utils/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import toast from "react-toast";
import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import { useSharedState } from "@/context/sharedContext";

const GithubAuth = () => {
  const { dispatch } = useSharedState();
  const notifyError = (message) => toast.error(message);

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      if (auth.currentUser) {
        dispatch({ type: "HIDE_REGISTER_MODAL" });
      }
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
