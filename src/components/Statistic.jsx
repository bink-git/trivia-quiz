import { formatDate } from '../utils/formatDate';
const Statistic = ({ results }) => {
  return (
    <div className="statistic">
      {!results.length && <p>You don&apos;t have a statistic yet</p>}
      <ul>
        {results.reverse().map((item, index) => (
          <li key={index}>
            <p>Date: {formatDate(item.date.toDate())},</p>
            <p>
              Correct Answers: {item.correctAnswers} / {item.totalQuestions}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statistic;
