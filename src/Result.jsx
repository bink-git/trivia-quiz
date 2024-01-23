function Result({ correctAnswers, onReset }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Congrats!</h2>
      <p>You answered {correctAnswers} of 10 questions</p>
      <button onClick={() => onReset()}>Try again</button>
    </div>
  );
}

export default Result;
