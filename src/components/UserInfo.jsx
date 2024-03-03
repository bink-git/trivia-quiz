import { Button } from "./ui/button";

const UserInfo = ({ user, handleLogout }) => {
  return (
    <div className="flex justify-between">
      <p>User: {user?.email ? user?.email : user?.displayName || "Guest"}</p>

      <Button variant="secondary" onClick={handleLogout}>
        {user ? "Logout" : "Quit the game"}
      </Button>
    </div>
  );
};

export default UserInfo;
