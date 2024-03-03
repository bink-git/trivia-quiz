import { formatDate } from "../utils/formatDate";
import { useSharedState } from "@/context/sharedContext";
const UserHistory = () => {
  const { state } = useSharedState();

  return (
    <div className="mx-auto max-w-[500px] rounded-2xl bg-white p-5">
      {!state.results.length && <p>You don&apos;t have a statistic yet</p>}
      <ul className="flex flex-col gap-4">
        {state.results.reverse().map((item, index) => (
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

export default UserHistory;
