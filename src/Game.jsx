import { useEffect, useState } from 'react';

function Game({ quest, onClickAnswer }) {
  const { incorrect_answers, correct_answer, question } = quest;

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [quest]);

  // const checkAnswer = (e, answer) => {
  //   onClickAnswer(answer);
  //   if (locked === false) {
  //     if (answer === correct_answer) {
  //       e.target.classList.add('correct');
  //       setLocked(true);
  //     } else {
  //       e.target.classList.add('incorrect');
  //       setLocked(true);
  //       setCorrectAnswer(correct_answer);
  //     }
  //   }
  // };

  const handleAnswerClick = (answer) => {
    if (!selectedAnswer) {
      onClickAnswer(answer);
      setSelectedAnswer(answer);
    }
  };

  // const getAnswerClassName = (answer) => {
  //   if (selectedAnswer) {
  //     if (answer === correct_answer) {
  //       return 'correct';
  //     } else if (answer === selectedAnswer) {
  //       return 'incorrect';
  //     }
  //   }
  //   return '';
  // };

  const answers = [correct_answer, ...incorrect_answers].sort();

  return (
    <>
      <h1>{quest.question}</h1>
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
