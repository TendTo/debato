import { GameState } from "@debato/api";
import React, { createContext, useState } from "react";

export interface GameStateContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const defaultValue: GameStateContextType = {
  gameState: { turn: 0, players: [] },
  setGameState: () => void 0,
};

export const GameStateContext =
  createContext<GameStateContextType>(defaultValue);

export default function ({ children }) {
  const [gameState, setGameState] = useState(defaultValue.gameState);
  return (
    <GameStateContext value={{ gameState, setGameState }}>
      {children}
    </GameStateContext>
  );
}
