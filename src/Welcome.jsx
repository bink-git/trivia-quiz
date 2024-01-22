import React from 'react';
import logo from './assets/logo.png';

const Welcome = ({ onStart }) => {
  return (
    <>
      <div className="welcome">
        <p>Welcome to the Trivia Challenge</p>
        <button onClick={() => onStart()}>Start Quiz</button>
      </div>
    </>
  );
};

export default Welcome;
