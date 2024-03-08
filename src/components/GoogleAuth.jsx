import { auth, googleProvider } from "../utils/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { useSharedState } from "@/context/sharedContext";

const GoogleAuth = () => {
  const { dispatch } = useSharedState();
  const notifyError = (message) => toast.error(message);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (auth.currentUser) {
        toast.success("Logged in successfully");
        dispatch({ type: "HIDE_MODAL" });
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <Button variant="secondary" size="auth" onClick={() => signInWithGoogle()}>
      <FcGoogle size={30} />
    </Button>
  );
};

export default GoogleAuth;
