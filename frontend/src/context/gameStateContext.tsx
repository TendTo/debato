import { GamePhase, GameState, PlayerState } from "@debato/api";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { RoomStateContext } from "./roomStateContext";
import { WebSocket } from "../api";

interface ExtendedGameState extends GameState {
  player: PlayerState;
}

export interface GameStateContextType {
  gameState: ExtendedGameState;
  setGameState: React.SetStateAction<GameState>;
}

const defaultValue: GameStateContextType = {
  gameState: {
    turn: 0,
    players: [],
    phase: GamePhase.NOT_STARTED,
    thesis: "",
    player: { name: "", points: 0, role: 0, vote: 0 },
  },
  setGameState: () => defaultValue.gameState,
};

export const GameStateContext =
  createContext<GameStateContextType>(defaultValue);

export default function ({ children }) {
  const { roomState } = useContext(RoomStateContext);
  const [gameState, extendedSetGameState] = useState(defaultValue.gameState);

  const setGameState = useCallback(
    (gameState: GameState) => {
      const player = gameState.players.find(
        (p) => p.name === roomState.user.name
      ) ?? { name: "", points: 0, role: 0, vote: 0 };
      extendedSetGameState({ ...gameState, player: player });
      return gameState;
    },
    [roomState, extendedSetGameState]
  );

  useEffect(() => {
    console.log("WebSocket.instance.on updatedRoom");
    WebSocket.instance.on("updatedGame", (gameState) => {
      console.log(gameState);
      setGameState(gameState);
    });
    // WebSocket.instance.on("updatedRoom", setRoomState);
  }, [setGameState]);

  return (
    <GameStateContext value={{ gameState, setGameState }}>
      {children}
    </GameStateContext>
  );
}
