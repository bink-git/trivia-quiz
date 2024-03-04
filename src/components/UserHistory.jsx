import { formatDate } from "../utils/formatDate";
import { useSharedState } from "@/context/sharedContext";
import { Button } from "./ui/button";
import { auth, db } from "@/utils/firebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
const UserHistory = () => {
  const {
    state: { results, isHistory },
    dispatch,
  } = useSharedState();

  const notifyError = (message) => toast.error(message);

  const getResultsFromFirestore = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const q = query(
          collection(db, "history"),
          where("userId", "==", userId),
          orderBy("date", "asc"),
        );
        const data = await getDocs(q);
        const filtredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch({ type: "SET_RESULTS", payload: filtredData });
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  const onHistory = async () => {
    dispatch({ type: "TOGGLE_HISTORY" });
    await getResultsFromFirestore();
  };

  return (
    <>
      <Button
        variant="statistic"
        className="mx-auto mb-10 mt-10"
        onClick={onHistory}
      >
        {isHistory ? "Hide statistic" : "Show statistic"}
      </Button>

      {isHistory && (
        <div className="mx-auto max-w-[500px] rounded-2xl bg-white p-5">
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
      )}
    </>
  );
};

export default UserHistory;
