import {
  GameAlreadyStartedError,
  GamePhase,
  GamePhaseCode,
  NotEnoughPlayersError,
  NotEnoughRoundsError,
  PlayerIsNotJudgeError,
  PlayerIsNotMediatorError,
  PlayerNotFoundError,
  PlayerState,
  Role,
  Vote,
} from "@debato/api";
import { DebatoSocket, shuffle } from "../util";
import Room from "./room";

export default class Game {
  private turn: number = 0;
  private phase: GamePhase = GamePhase.NOT_STARTED;
  private players: PlayerState[] = [];
  private thesis: string[] = [];

  constructor(readonly room: Room) {}

  startGame() {
    if (this.phase !== GamePhase.NOT_STARTED) {
      throw new GameAlreadyStartedError();
    }
    if (this.room.users.length < 4) {
      throw new NotEnoughPlayersError();
    }
    if (this.room.configuration.maxRounds < 1) {
      throw new NotEnoughRoundsError();
    }
    this.turn = 0;
    this.players = this.room.users.map((u) => ({
      points: 0,
      role: Role.UNASSIGNED,
      vote: Vote.ABSTAIN,
      name: u.name,
    }));
    this.thesis = shuffle(
      this.room.configuration.thesis.slice(0, this.room.configuration.maxRounds)
    );
    this.players = shuffle(this.players);
    this.startRound();
  }

  startRound() {
    if (this.turn >= this.room.configuration.maxRounds) {
      this.phase = GamePhase.NOT_STARTED;
      return;
    }
    for (const player of this.players) {
      player.role = Role.UNASSIGNED;
    }
    this.players[this.turn % this.players.length].role = Role.JUDGE;
    this.players[(this.turn + 1) % this.players.length].role = Role.THESIS;
    this.phase = GamePhase.CHOOSE;
  }

  chooseRoles(mediatorName: string, playerName: string) {
    if (this.phase !== GamePhase.CHOOSE) {
      return;
    }
    const mediator = this.players.find((p) => p.name === mediatorName);
    if (!mediator || mediator.role !== Role.MEDIATOR) {
      throw new PlayerIsNotMediatorError(mediatorName);
    }
    const player = this.players.find((p) => p.name === playerName);
    if (!player || player.role !== Role.UNASSIGNED) {
      throw new PlayerNotFoundError(playerName);
    }
    player.role = Role.ANTITHESIS;
    this.players.map((p) => {
      p.role = p.role === Role.UNASSIGNED ? Role.JUDGE : p.role;
    });
    if (!this.players.every((p) => p.role !== Role.UNASSIGNED)) {
      throw new Error("Not all roles are assigned");
    }
    this.phase = GamePhase.DEBATE;
  }

  endDebate(mediatorPlayerName: string) {
    if (this.phase !== GamePhase.DEBATE) {
      return;
    }
    const mediator = this.players.find((p) => p.name === mediatorPlayerName);
    if (mediator.role !== Role.MEDIATOR) {
      throw new PlayerIsNotMediatorError(mediatorPlayerName);
    }
    this.phase = GamePhase.VOTE;
  }

  vote(votingPlayerName: string, vote: Vote) {
    if (this.phase !== GamePhase.VOTE) {
      return;
    }

    const votingPlayer = this.players.find((p) => p.name === votingPlayerName);
    if (
      votingPlayer.role !== Role.JUDGE &&
      votingPlayer.role !== Role.MEDIATOR
    ) {
      throw new PlayerIsNotJudgeError(votingPlayerName);
    }
    votingPlayer.vote = vote;
  }

  endVote() {
    if (this.phase !== GamePhase.VOTE) {
      return;
    }

    const thesisPlayers = this.players.find((p) => p.role === Role.THESIS);
    const antithesisPlayers = this.players.find(
      (p) => p.role === Role.ANTITHESIS
    );

    const [abstainedVoters, thesisVoters, antithesisVoters] =
      this.players.reduce(
        (acc, player) => {
          if (player.role === Role.THESIS || player.role === Role.ANTITHESIS) {
            return acc;
          }
          if (player.vote === Vote.ABSTAIN) {
            acc[0].push(player);
          } else if (player.vote === Vote.THESIS) {
            acc[1].push(player);
          } else if (player.vote === Vote.ANTITHESIS) {
            acc[2].push(player);
          }
          return acc;
        },
        [[], [], []] as [PlayerState[], PlayerState[], PlayerState[]]
      );

    if (thesisVoters.length !== antithesisVoters.length) {
      thesisPlayers.points +=
        thesisVoters.length > antithesisVoters.length
          ? this.room.configuration.pointsVoteWinner
          : this.room.configuration.pointsVoteLoser;
      antithesisPlayers.points +=
        thesisVoters.length > antithesisVoters.length
          ? this.room.configuration.pointsVoteLoser
          : this.room.configuration.pointsVoteWinner;
      thesisVoters.forEach(
        (p) =>
          (p.points +=
            thesisVoters.length > antithesisVoters.length
              ? this.room.configuration.pointsVoteWinner
              : this.room.configuration.pointsVoteLoser)
      );
      antithesisVoters.forEach(
        (p) =>
          (p.points +=
            thesisVoters.length > antithesisVoters.length
              ? this.room.configuration.pointsVoteLoser
              : this.room.configuration.pointsVoteWinner)
      );
      abstainedVoters.forEach(
        (p) => (p.points += this.room.configuration.pointsAbstained)
      );
    }
    this.phase = GamePhase.END;
  }

  emitUpdatedGame(socket: DebatoSocket) {
    socket.nsp.to(this.room.id).emit("updatedGame", {
      turn: this.turn,
      phase: this.phase.valueOf() as GamePhaseCode,
      players: this.players,
      thesis: this.thesis[this.turn],
    });
  }
}
