const Statistic = ({ statistic, results }) => {
  return (
    <div className="statistic">
      <ul>
        {statistic.reverse().map((entry, index) => (
          <li key={index}>
            <p>Date: {entry.date},</p>
            <p>
              Correct Answers: {entry.correctAnswers} / {entry.totalQuestions}
            </p>
          </li>
        ))}
      </ul>
      <ul>
        {results.reverse().map((entry, index) => (
          <li key={index}>
            <p>Date: {entry.date},</p>
            <p>
              Correct Answers: {entry.correctAnswers} / {entry.totalQuestions}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statistic;
