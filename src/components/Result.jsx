import { Button } from './ui/button';

function Result({ correctAnswers, onReset, totalQuestions }) {
  return (
    <div className="text-center text-xl font-bold">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
        className="w-[120px] mx-auto"
      />
      <h2 className="mt-5">Congrats!</h2>
      <p className="mb-5 mt-5">
        You answered {correctAnswers} of {totalQuestions} questions
      </p>
      <Button className="mb-5" onClick={() => onReset()}>
        Try again
      </Button>
    </div>
  );
}

export default Result;
