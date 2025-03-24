import { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";

export const GameContext = createContext(initialState);

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
