import { ErrorTypeCode } from "./errors";
import { GameState, VoteCode } from "./gameState";
import { RoomState, RoomConfiguration } from "./roomState";

export type Acknowledgment<T> = (data: T) => void;
export type Last<T extends any[]> = T extends [...infer H, infer L] ? L : any;
export type AllButLast<T extends any[]> = T extends [...infer H, infer L]
  ? H
  : any[];
export type FirstArg<T> = T extends (arg: infer Param) => infer Result
  ? Param
  : any;
type ErrorStateError = {
  error: ErrorTypeCode;
  errorMessage: string;
};
type ErrorStateNoError = {
  error?: never;
  errorMessage?: never;
};
export type ErrorState = ErrorStateError | ErrorStateNoError;
export type ErrorAcknowledgment = Acknowledgment<ErrorState>;

export interface ClientToServerEvents {
  joinRoom: (roomId: string, name: string, ack: ErrorAcknowledgment) => void;
  createRoom: (name: string, ack: ErrorAcknowledgment) => void;
  leaveRoom: () => void;
  updateConfiguration: (configuration: RoomConfiguration) => void;
  castVote: (vote: VoteCode) => void;
  chooseRoles: (antithesis: string) => void;
  startGame: () => void;
  endVote: () => void;
  endDebate: () => void;
}

export interface ServerToClientEvents {
  updatedRoom: (room: RoomState) => void;
  updatedGame: (game: GameState) => void;
}
