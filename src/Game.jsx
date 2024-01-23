import { useEffect, useState } from 'react';

function Game({ quest, onClickAnswer }) {
  const { incorrect_answers, correct_answer, question } = quest;

  const [selectedAnswer, setSelectedAnswer] = useState(null);

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
    <>
      <h2>{quest.question}</h2>
      <ul>
        {answers.map((answer) => (
          <li
            onClick={() => handleAnswerClick(answer)}
            style={{
              cursor: selectedAnswer ? 'not-allowed' : 'pointer',
            }}
            className={`${
              selectedAnswer &&
              (answer === correct_answer
                ? 'correct'
                : answer === selectedAnswer
                ? 'incorrect'
                : '')
            }`}
            key={answer}
          >
            {answer}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Game;
