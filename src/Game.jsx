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
    <div className="flex flex-col mb-10">
      <h2 className="mb-5 text-3xl font-bold ">
        {decodeTitle || (
          <Skeleton count={1} width={100} style={{ width: '600px' }} />
        )}
      </h2>
      <ul className="p-0">
        {answers.map((answer) => (
          <li
            onClick={() => handleAnswerClick(answer)}
            style={{
              cursor: selectedAnswer ? 'cursor-not-allowed' : 'cursor-pointer',
            }}
            className={`${
              selectedAnswer &&
              (answer === correct_answer
                ? 'bg-green-400  border-2 border-green-600 rounded-[16px] mb-3 cursor-pointer transition-all'
                : answer === selectedAnswer
                ? 'bg-red-400  border-2 border-red-600 rounded-[16px] mb-3 cursor-pointer transition-all'
                : '')
            } w-full p-4 border-2 rounded-2xl mb-3 cursor-pointer transition-all text-xl`}
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
