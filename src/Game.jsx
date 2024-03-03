import { useEffect, useState } from "react";
import he from "he";
import Skeleton from "react-loading-skeleton";

function Game({ quest, onClickAnswer }) {
  const { incorrect_answers, correct_answer, question } = quest;

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const decodeTitle = he.decode(question);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [quest]);

  const handleAnswerClick = (answer) => {
    if (!selectedAnswer) {
      onClickAnswer(answer);
      setSelectedAnswer(answer);
    }
  };

  const answers = [correct_answer, ...incorrect_answers].sort();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">
        {decodeTitle || (
          <Skeleton count={1} width={100} style={{ width: "600px" }} />
        )}
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
