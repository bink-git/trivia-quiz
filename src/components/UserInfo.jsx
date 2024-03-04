import { useSharedState } from "@/context/sharedContext";
import { auth } from "../utils/firebaseConfig";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LOGOUT_MESAGE } from "@/utils/constants";
import { useEffect } from "react";

const UserInfo = ({ user }) => {
  const { state, dispatch } = useSharedState();
  const navigate = useNavigate();

  const notifySuccess = () => toast.success(LOGOUT_MESAGE);
  const notifyError = (message) => toast.error(message);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch({ type: "RESET_GAME" });
      console.log(state);
      navigate("/login");
      notifySuccess();
    } catch (err) {
      notifyError(err.message);
    }
  };

  useEffect(() => {
    console.log(state); // Log the state whenever it changes
  }, [state]);

  return (
    <div className="mb-2 flex items-center justify-between text-lg">
      <p>User: {user?.email ? user?.email : user?.displayName || "Guest"}</p>

      <Button variant="secondary" onClick={handleLogout}>
        {user ? "Logout" : "Quit the game"}
      </Button>
    </div>
  );
};

export default UserInfo;
