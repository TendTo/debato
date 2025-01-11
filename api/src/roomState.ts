import { ErrorTypeCode } from "./errors";

export type RoomConfiguration = {
  thesis: string[];
  maxPlayers: number;
  maxRounds: number;
  // One between Thesis and Antithesis won
  pointsVoteWinner: number;
  pointsVoteLoser: number;
  pointsLoser: number;
  pointsWinner: number;
  pointsAbstained: number;
  // Draw between Thesis and Antithesis
  pointsVoteDraw: number;
  pointsDraw: number;
  pointsAbstainedDraw: number;
  // All players abstained
  pointsVoteAllAbstained: number;
  pointsAllAbstained: number;
};

export const defaultConfiguration: RoomConfiguration = {
  thesis: [],
  maxPlayers: 20,
  maxRounds: 5,
  // One between Thesis and Antithesis won
  pointsVoteWinner: 1,
  pointsVoteLoser: 0,
  pointsLoser: 0,
  pointsWinner: 2,
  pointsAbstained: 0,
  // Draw between Thesis and Antithesis
  pointsVoteDraw: 0,
  pointsDraw: 1,
  pointsAbstainedDraw: 2,
  // All players abstained
  pointsVoteAllAbstained: 0,
  pointsAllAbstained: 2,
};

export interface UserState {
  id: string;
  name: string;
  isOwner: boolean;
}

export interface RoomState {
  roomId: string;
  configuration: RoomConfiguration;
  users: UserState[];
}
