import { Button } from "../components/ui/button";
import { useSharedState } from "@/context/sharedContext";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDataFetching from "@/hooks/useDataFetching";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const WelcomePage = () => {
  const {
    state: { difficulty, isLoading },
    dispatch,
  } = useSharedState();

  const { fetchData } = useDataFetching();

  const navigate = useNavigate();

  const notifyError = (message) => toast.error(message);

  const onStart = async () => {
    try {
      dispatch({ type: "LOADING_TRUE" });
      await fetchData();
      navigate("/game");
    } catch (error) {
      notifyError(error.message);
    } finally {
      dispatch({ type: "LOADING_FALSE" });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-5 rounded-3xl bg-white p-5">
          <p className="text-center text-4xl font-bold text-background">
            Welcome to the Trivia Challenge
          </p>

          <div className="flex flex-col gap-3">
            <Label
              className="text-center text-lg font-bold text-background"
              htmlFor="difficulty"
            >
              Please, select difficulty
            </Label>
            <Select
              onValueChange={(value) => {
                dispatch({ type: "SET_DIFFICULTY", payload: value });
              }}
              defaultValue={difficulty}
            >
              <SelectTrigger
                id="difficulty"
                className="w-[180px] rounded-full border-2 border-background bg-white p-6 text-lg outline-none"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem className="text-lg" value="easy">
                  😉 Easy
                </SelectItem>
                <SelectItem className="text-lg" value="medium">
                  🙄 Medium
                </SelectItem>
                <SelectItem className="text-lg" value="hard">
                  😓 Hard
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={onStart}>Start Quiz</Button>
        </div>
      )}
    </>
  );
};

export default WelcomePage;
