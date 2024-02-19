import { formatDate } from '../utils/formatDate';
const Statistic = ({ results, userStatistics }) => {
  console.log(userStatistics);
  return (
    <div className="statistic">
      <ul>
        {userStatistics.reverse().map((item, index) => (
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
