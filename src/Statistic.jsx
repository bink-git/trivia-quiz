import React from 'react';

const Statistic = ({ correctAnswers, totalQuestions, statistic }) => {
  return (
    <div className="statistic">
      <ul>
        {statistic.map((entry, index) => (
          <li key={index}>
            <p>Date: {entry.date},</p>
            <p>
              Correct Answers: {entry.correctAnswers} / {totalQuestions}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statistic;
