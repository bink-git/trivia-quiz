import { createContext, useState } from 'react';

export const GameContext = createContext();

const Context = (props) => {
  const [anonymous, setAnonymous] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const value = {
    anonymous,
    setAnonymous,
    userEmail,
    setUserEmail,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};

export default Context;
