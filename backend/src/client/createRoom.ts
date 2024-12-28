import type { Server, Socket } from "socket.io";
import { generateRoomId, handler, MAX_ROOMS } from "../util";
import { Room, Rooms } from "../data";
import { ErrorAcknowledgment, RoomLimitReachedError } from "@debato/api";
import { nameSchema } from "./schema";

export default function (io: Server, socket: Socket) {
  return handler((name: string, ack: ErrorAcknowledgment) => {
    if (io.sockets.adapter.rooms.size >= MAX_ROOMS) {
      throw new RoomLimitReachedError();
    }
    let roomId = generateRoomId();
    while (io.sockets.adapter.rooms.has(roomId)) {
      roomId = generateRoomId();
    }
    const room = Rooms.addRoom(new Room(roomId));
    room.addUser(socket, name, true);
    room.emitUpdatedRoom(socket);
    ack({});
    console.log("Room created", room.id);
  }, nameSchema);
}
