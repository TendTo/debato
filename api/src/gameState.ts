export enum Role {
  UNASSIGNED,
  MEDIATOR,
  THESIS,
  ANTITHESIS,
  JUDGE,
}

export type RoleCode = `${Role}` extends `${infer T extends number}`
  ? T
  : never;

export enum Vote {
  ABSTAIN,
  THESIS,
  ANTITHESIS,
}

export type VoteCode = `${Vote}` extends `${infer T extends number}`
  ? T
  : never;

export enum GamePhase {
  NOT_STARTED,
  DRAW,
  CHOOSE,
  DEBATE,
  VOTE,
  END,
}

export type GamePhaseCode = `${GamePhase}` extends `${infer T extends number}`
  ? T
  : never;

export interface PlayerState {
  name: string;
  points: number;
  role: RoleCode;
  vote: VoteCode;
}

export interface GameState {
  turn: number;
  thesis: string;
  phase: GamePhaseCode;
  players: PlayerState[];
}
