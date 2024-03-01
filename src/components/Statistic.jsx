import { formatDate } from '../utils/formatDate';
const Statistic = ({ results }) => {
  return (
    <div className="p-5 rounded-2xl bg-white max-w-[500px] mx-auto">
      {!results.length && <p>You don&apos;t have a statistic yet</p>}
      <ul className="flex flex-col gap-4">
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
