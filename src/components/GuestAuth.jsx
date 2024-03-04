import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSharedState } from "@/context/sharedContext";

const GuestAuth = () => {
  const { dispatch } = useSharedState();
  const navigate = useNavigate();

  return (
    <div className="container mt-10 flex max-w-[400px] flex-col items-center">
      <div className="relative mb-10 flex w-full items-center justify-center">
        <div className="h-[2px] w-[80%] bg-slate-50"></div>
        <span className="absolute bg-background px-5 text-center text-lg text-white">
          OR
        </span>
      </div>
      <Button
        onClick={() => {
          dispatch({ type: "SET_ANONYMOUS" });
          navigate("/welcome");
        }}
      >
        Play as Guest
      </Button>
    </div>
  );
};

export default GuestAuth;
