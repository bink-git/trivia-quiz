import { useSharedState } from "@/context/sharedContext";
import { auth } from "../utils/firebaseConfig";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LOGOUT_MESAGE } from "@/utils/constants";

const UserInfo = ({ user }) => {
  const { dispatch } = useSharedState();
  const navigate = useNavigate();

  const notifySuccess = () => toast.success(LOGOUT_MESAGE);
  const notifyError = (message) => toast.error(message);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch({ type: "RESET_GAME" });
      navigate("/");
      notifySuccess();
    } catch (err) {
      notifyError(err.message);
    }
  };

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
