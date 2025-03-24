import { useContext } from "react";
import { GameContext } from "./GameContext";

export const useSharedState = () => useContext(GameContext);
