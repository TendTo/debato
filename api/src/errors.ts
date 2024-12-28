export enum ErrorType {
  GENERIC_ERROR = 1,
  NOT_LOGGED_IN_ERROR,
  NOT_IN_ROOM_ERROR,
  VALIDATION_ERROR,
  ROOM_NOT_FOUND_ERROR,
  ROOM_FULL_ERROR,
  ROOM_LIMIT_REACHED_ERROR,
  ROOM_ALREADY_STARTED_ERROR,
  USER_NOT_FOUND_IN_ROOM_ERROR,
  USER_NAME_ALREADY_IN_USE_ERROR,
  PLAYER_NOT_FOUND_ERROR,
  PLAYER_IS_NOT_MEDIATOR_ERROR,
  PLAYER_IS_NOT_JUDGE_ERROR,
  PLAYER_IS_NOT_THESIS_ERROR,
  PLAYER_IS_NOT_ANTITHESIS_ERROR,
  GAME_ALREADY_STARTED_ERROR,
  NOT_ENOUGH_PLAYERS_ERROR,
  NOT_ENOUGH_ROUNDS_ERROR,
}

export type ErrorTypeCode = `${ErrorType}` extends `${infer T extends number}`
  ? T
  : never;

export const ErrorMap: Record<ErrorType, string> = {
  [ErrorType.GENERIC_ERROR]: "Generic error",
  [ErrorType.NOT_LOGGED_IN_ERROR]: "",
  [ErrorType.NOT_IN_ROOM_ERROR]: "Not in room",
  [ErrorType.VALIDATION_ERROR]: "Validation error",
  [ErrorType.ROOM_NOT_FOUND_ERROR]: "Room not found",
  [ErrorType.ROOM_FULL_ERROR]: "Room full",
  [ErrorType.ROOM_ALREADY_STARTED_ERROR]: "Room already started",
  [ErrorType.USER_NAME_ALREADY_IN_USE_ERROR]: "User name already in use",
  [ErrorType.USER_NOT_FOUND_IN_ROOM_ERROR]: "User not found in room",
  [ErrorType.PLAYER_NOT_FOUND_ERROR]: "Player not found",
  [ErrorType.PLAYER_IS_NOT_MEDIATOR_ERROR]: "Player is not mediator",
  [ErrorType.PLAYER_IS_NOT_JUDGE_ERROR]: "Player is not judge",
  [ErrorType.PLAYER_IS_NOT_THESIS_ERROR]: "Player is not thesis",
  [ErrorType.PLAYER_IS_NOT_ANTITHESIS_ERROR]: "Player is not antithesis",
  [ErrorType.ROOM_LIMIT_REACHED_ERROR]: "Room limit reached",
  [ErrorType.GAME_ALREADY_STARTED_ERROR]: "Game already started",
  [ErrorType.NOT_ENOUGH_PLAYERS_ERROR]: "Not enough players",
  [ErrorType.NOT_ENOUGH_ROUNDS_ERROR]: "Not enough rounds",
};

export class DebatoApiError extends Error {
  constructor(public readonly error: ErrorType, message?: string) {
    super(message ?? ErrorMap[error]);
  }
}

export class GenericError extends DebatoApiError {
  constructor(message?: string) {
    super(ErrorType.GENERIC_ERROR, message);
  }
}

export class ValidationError extends DebatoApiError {
  constructor(message?: string) {
    super(ErrorType.VALIDATION_ERROR, message);
  }
}

export class NotLoggedInError extends DebatoApiError {
  constructor(userId: string) {
    super(ErrorType.NOT_LOGGED_IN_ERROR, `User ${userId} not logged in`);
  }
}

export class RoomNotFoundError extends DebatoApiError {
  constructor(roomId: string) {
    super(ErrorType.ROOM_NOT_FOUND_ERROR, `Room ${roomId} not found`);
  }
}

export class RoomFullError extends DebatoApiError {
  constructor(roomId: string) {
    super(ErrorType.ROOM_FULL_ERROR, `Room ${roomId} is full`);
  }
}

export class RoomLimitReachedError extends DebatoApiError {
  constructor() {
    super(
      ErrorType.ROOM_LIMIT_REACHED_ERROR,
      `Room limit on the server reached`
    );
  }
}

export class RoomAlreadyStartedError extends DebatoApiError {
  constructor(roomId: string) {
    super(
      ErrorType.ROOM_ALREADY_STARTED_ERROR,
      `Room ${roomId} already started`
    );
  }
}

export class UserNotFoundInRoomError extends DebatoApiError {
  constructor(roomId: string, userId: string) {
    super(
      ErrorType.USER_NOT_FOUND_IN_ROOM_ERROR,
      `User ${userId} not found in room ${roomId}`
    );
  }
}

export class UserNameAlreadyInUseError extends DebatoApiError {
  constructor(roomId: string, name: string) {
    super(
      ErrorType.USER_NAME_ALREADY_IN_USE_ERROR,
      `User name ${name} already in use in room ${roomId}`
    );
  }
}

export class PlayerNotFoundError extends DebatoApiError {
  constructor(playerId: string) {
    super(ErrorType.PLAYER_NOT_FOUND_ERROR, `Player ${playerId} not found`);
  }
}

export class PlayerIsNotMediatorError extends DebatoApiError {
  constructor(playerId: string) {
    super(
      ErrorType.PLAYER_IS_NOT_MEDIATOR_ERROR,
      `Player ${playerId} is not mediator`
    );
  }
}

export class PlayerIsNotJudgeError extends DebatoApiError {
  constructor(playerId: string) {
    super(
      ErrorType.PLAYER_IS_NOT_JUDGE_ERROR,
      `Player ${playerId} is not judge`
    );
  }
}

export class PlayerIsNotThesisError extends DebatoApiError {
  constructor(playerId: string) {
    super(
      ErrorType.PLAYER_IS_NOT_THESIS_ERROR,
      `Player ${playerId} is not thesis`
    );
  }
}

export class PlayerIsNotAntithesisError extends DebatoApiError {
  constructor(playerId: string) {
    super(
      ErrorType.PLAYER_IS_NOT_ANTITHESIS_ERROR,
      `Player ${playerId} is not antithesis`
    );
  }
}

export class GameAlreadyStartedError extends DebatoApiError {
  constructor() {
    super(ErrorType.GAME_ALREADY_STARTED_ERROR, `Game already started`);
  }
}

export class NotEnoughPlayersError extends DebatoApiError {
  constructor() {
    super(
      ErrorType.NOT_ENOUGH_PLAYERS_ERROR,
      `You need at least 4 players to start the game`
    );
  }
}

export class NotEnoughRoundsError extends DebatoApiError {
  constructor() {
    super(
      ErrorType.NOT_ENOUGH_ROUNDS_ERROR,
      `You need at least 1 round to start the game`
    );
  }
}
