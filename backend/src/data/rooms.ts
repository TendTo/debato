import { Socket } from "socket.io";
import Room from "./room";
import { NotLoggedInError, RoomNotFoundError, UserState } from "@debato/api";

export default class Rooms {
  private static _rooms: Map<string, Room> = new Map<string, Room>();

  static get rooms(): Map<string, Room> {
    return this._rooms;
  }

  /**
   * Get the room the user with the given id is in
   * @param userId id of the user to get the room of
   * @returns the room the user is in
   * @throws NotLoggedInError if the user is not in any room
   */
  public static getRoomFromSocket(socket: Socket): Room {
    for (const roomId of socket.rooms) {
      if (this._rooms.has(roomId)) {
        return this._rooms.get(roomId);
      }
    }
    throw new NotLoggedInError(socket.id);
  }

  /**
   * Get the user in the room connected to the given socket
   * @param socket websocket the user is connected to
   * @returns the user in the room connected to the socket
   * @throws NotLoggedInError if the user is not in any room
   */
  public static getUserFromSocket(socket: Socket): UserState {
    for (const roomId of socket.rooms) {
      if (this._rooms.has(roomId)) {
        return this._rooms.get(roomId).getUser(socket.id);
      }
    }
    throw new NotLoggedInError(socket.id);
  }

  /**
   * Add a room to the list of rooms
   * @param room room to add
   * @returns the room that was added
   */
  public static addRoom(room: Room): Room {
    console.log("Added room ", room.id);
    this._rooms.set(room.id, room);
    return room;
  }

  /**
   * Get the room with the given id
   * @param roomId id of the room to get
   * @returns the room with the given id
   * @throws RoomNotFoundError if the room does not exist
   */
  public static getRoom(roomId: string): Room {
    const room = this._rooms.get(roomId);
    if (!room) throw new RoomNotFoundError(roomId);
    return room;
  }

  /**
   * Check if a room with the given id exists
   * @param roomId id of the room to check
   * @returns true if the room exists, false otherwise
   */
  public static hasRoom(roomId: string): boolean {
    return this._rooms.has(roomId);
  }

  /**
   * Remove the room with the given id
   * @param roomId id of the room to remove
   * @returns true if the room was removed, false otherwise
   */
  public static removeRoom(roomId: string): boolean {
    console.log("Removed room ", roomId);
    return this._rooms.delete(roomId);
  }
}
