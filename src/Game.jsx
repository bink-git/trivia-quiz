import { useEffect, useState } from "react";
import he from "he";
import { Skeleton } from "@/components/ui/skeleton";
import { useSharedState } from "./context/sharedContext";
import { toast } from "react-toastify";

function Game({ quest }) {
  const {
    state: { data, step, correctAnswers, totalQuestions, isLoading },
    dispatch,
  } = useSharedState();

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const { incorrect_answers, correct_answer, question } = quest;
  const decodeTitle = he.decode(question);
  const answers = [correct_answer, ...incorrect_answers];

  useEffect(() => {
    setSelectedAnswer(null);
  }, [quest]);

  const onClickAnswer = (answer) => {
    if (data[step].correct_answer === answer) {
      dispatch({ type: "SET_CORRECT_ANSWERS", payload: correctAnswers + 1 });
    }
    dispatch({ type: "SET_TOTAL_QUESTIONS", payload: totalQuestions + 1 });
  };

  const handleAnswerClick = (answer) => {
    if (!selectedAnswer) {
      onClickAnswer(answer);
      setSelectedAnswer(answer);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">
        {decodeTitle || <Skeleton className="w-full" />}
      </h2>

      <ul className="flex flex-col gap-2">
        {answers.map((answer) => (
          <li
            onClick={() => handleAnswerClick(answer)}
            style={{
              cursor: selectedAnswer ? "not-allowed" : "pointer",
            }}
            className={`${
              selectedAnswer &&
              (answer === correct_answer
                ? " border-green-400 bg-green-300"
                : answer === selectedAnswer
                  ? " border-red-400 bg-red-300"
                  : "")
            } mb-3 w-full cursor-pointer rounded-2xl border-2 p-4 text-xl transition-all`}
            key={answer}
          >
            {he.decode(answer)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Game;
