import { useState } from 'react';

const Welcome = ({ onStart, onDifficulty }) => {
  const [select, setSelect] = useState('');

  const handleSelect = (event) => {
    setSelect(event.target.value);
    onDifficulty(event.target.value);
  };

  return (
    <>
      <div className="welcome">
        <p>Welcome to the Trivia Challenge</p>
        <label htmlFor="selectOption">Please, select difficulty</label>
        <select
          name="select"
          id="selectOption"
          value={select}
          onChange={handleSelect}
        >
          <option value="easy">😉 Easy</option>
          <option value="medium">🙄 Medium</option>
          <option value="hard">😓 Hard</option>
        </select>
        <button className="btn" onClick={() => onStart()}>
          Start Quiz
        </button>
      </div>
    </>
  );
};

export default Welcome;
