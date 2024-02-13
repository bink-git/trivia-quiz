import { useEffect, useState } from 'react';
import he from 'he';
import Skeleton from 'react-loading-skeleton';

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
    <div className="game">
      <h2>
        {decodeTitle || (
          <Skeleton count={1} width={100} style={{ width: '600px' }} />
        )}
      </h2>
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
            {he.decode(answer)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Game;
