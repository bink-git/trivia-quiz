import { useEffect, useState } from "react";
import he from "he";
import { useSharedState } from "../context/sharedContext";
import { Button } from "./ui/button";

function Game({ selectedAnswer, setSelectedAnswer }) {
  const {
    state: { data, prefetchedData, step, correctAnswers, totalQuestions },
    dispatch,
  } = useSharedState();

  const { incorrect_answers, correct_answer, question } = data[step] || {};
  const answers = [correct_answer, ...incorrect_answers].sort();
  const decodeTitle = he.decode(question);
  const LAST_INDEX = data.length - 1;

  useEffect(() => {
    setSelectedAnswer(null);
  }, [step]);

  useEffect(() => {
    if (step === LAST_INDEX) {
      dispatch({
        type: "SET_DATA",
        payload: [...data, ...prefetchedData],
      });
      dispatch({
        type: "SET_PREFETCHED_DATA",
        payload: [],
      });
    }
  }, [prefetchedData, step, data.length]);

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
      <h2 className="text-2xl font-bold">{decodeTitle}</h2>

      <div className="flex flex-col gap-2">
        {answers.map((answer) => (
          <Button
            onClick={() => handleAnswerClick(answer)}
            style={{
              cursor: selectedAnswer ? "not-allowed" : "pointer",
            }}
            variant="answer"
            className={`${
              selectedAnswer &&
              (answer === correct_answer
                ? "border-green-400 bg-green-300"
                : answer === selectedAnswer
                  ? "border-red-400 bg-red-300"
                  : "")
            }     `}
            key={answer}
          >
            {he.decode(answer)}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Game;
