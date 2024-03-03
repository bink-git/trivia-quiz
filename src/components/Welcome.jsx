import { Button } from "./ui/button";
import { useSharedState } from "@/context/sharedContext";

const Welcome = ({ onStart }) => {
  const { state, dispatch } = useSharedState();

  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-5 rounded-3xl bg-white p-5">
      <p className="text-center text-4xl font-bold text-background">
        Welcome to the Trivia Challenge
      </p>
      <label className="font-bold text-background" htmlFor="selectOption">
        Please, select difficulty
      </label>
      <select
        name="select"
        id="selectOption"
        defaultValue={state.difficulty}
        onChange={(e) => {
          dispatch({ type: "SET_DIFFICALTY", payload: e.target.value });
        }}
        className="w-[180px] rounded-full border-2 border-background bg-white p-3 text-lg outline-none"
      >
        <option value="easy">😉 Easy</option>
        <option value="medium">🙄 Medium</option>
        <option value="hard">😓 Hard</option>
      </select>

      <Button onClick={onStart}>Start Quiz</Button>
    </div>
  );
};

export default Welcome;
