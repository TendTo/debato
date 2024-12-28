import { DebatoSocket } from "../util";
import Game from "./game";
import {
  defaultConfiguration,
  RoomConfiguration,
  RoomFullError,
  UserNameAlreadyInUseError,
  UserNotFoundInRoomError,
  UserState,
  Vote,
} from "@debato/api";
import thesis from "./thesis.json";

export default class Room {
  public users: UserState[] = [];
  public configuration: RoomConfiguration = { ...defaultConfiguration, thesis };
  private game: Game = new Game(this);

  constructor(readonly id: string) {}

  /**
   * Add a user to the room.
   * The user will be added to the room and joined to the socket room.
   * Name must be unique in the room.
   * @param socket socket of the user to add
   * @param name name of the user to add
   * @param isOwner whether the user is the owner of the room
   * @throws UserNameAlreadyInUseError if the name is already in use
   */
  addUser(socket: DebatoSocket, name: string, isOwner: boolean = false) {
    if (this.users.length >= this.configuration.maxPlayers) {
      throw new RoomFullError(this.id);
    }
    if (this.users.find((u) => u.name === name)) {
      throw new UserNameAlreadyInUseError(this.id, name);
    }
    socket.join(this.id);
    this.users.push({ id: socket.id, name, isOwner });
  }

  removeUser(socket: DebatoSocket) {
    socket.leave(this.id);
    this.users = this.users.filter((u) => u.id !== socket.id);
    this.ensureOwner();
  }

  emitUpdatedRoom(socket: DebatoSocket) {
    socket.nsp.to(this.id).emit("updatedRoom", {
      roomId: this.id,
      configuration: this.configuration,
      users: this.users,
    });
  }

  getUsers() {
    return this.users;
  }

  startGame() {
    this.game.startGame();
  }

  emitUpdatedGame(socket: DebatoSocket) {
    this.game.emitUpdatedGame(socket);
  }

  chooseRoles(socket: DebatoSocket, playerName: string) {
    const mediatorName = this.getUser(socket.id).name;
    this.game.chooseRoles(mediatorName, playerName);
  }

  endDebate(socket: DebatoSocket) {
    const mediatorName = this.getUser(socket.id).name;
    this.game.endDebate(mediatorName);
  }

  vote(socket: DebatoSocket, vote: Vote) {
    const playerName = this.getUser(socket.id).name;
    this.game.vote(playerName, vote);
  }

  endVote(socket: DebatoSocket) {
    this.game.endVote();
  }

  /**
   * Get the user with the given id
   * @param userId id of the user to get
   * @returns the user with the given id
   * @throws UserNotFoundInRoomError if the user is not in the room
   */
  getUser(userId: string) {
    const user = this.users.find((p) => p.id === userId);
    if (!user) throw new UserNotFoundInRoomError(this.id, userId);
    return user;
  }

  getUsersCount() {
    return this.users.length;
  }

  hasUser(user: UserState) {
    return this.users.includes(user);
  }

  ensureOwner() {
    if (this.users.length === 0) return;
    if (!this.users.some((u) => u.isOwner)) {
      this.users[0].isOwner = true;
    }
  }
}
