import { useEffect, useState } from 'react';
import he from 'he';

function Game({ quest, onClickAnswer, correctAnswers, totalQuestions }) {
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
  // const handleAnswerClick = (answer) => {
  //   onClickAnswer(answer);
  //   setSelectedAnswer(answer);
  // };

  const answers = [correct_answer, ...incorrect_answers].sort();

  return (
    <>
      <p>
        Correct Answers: {correctAnswers} / {totalQuestions}{' '}
      </p>
      <h2>{decodeTitle}</h2>
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
            // className={selectedAnswer === answer ? 'correct' : ''}
            key={answer}
          >
            {he.decode(answer)}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Game;
