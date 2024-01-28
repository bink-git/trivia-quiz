import React from 'react';

const Statistic = ({ correctAnswers, totalQuestions, statistic }) => {
  return (
    <div className="statistic">
      <ul>
        {statistic.map((entry, index) => (
          <li key={index}>
            Date: {entry.date}, Correct Answers: {entry.correctAnswers} /
            {totalQuestions}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statistic;
