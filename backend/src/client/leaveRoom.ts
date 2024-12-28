import type { Server } from "socket.io";
import { handler, type DebatoSocket } from "../util";
import { Rooms } from "../data";

export default function (io: Server, socket: DebatoSocket) {
  return handler(() => {
    const room = Rooms.getRoomFromSocket(socket);
    room.removeUser(socket);
    room.emitUpdatedRoom(socket);
    console.log("Leaving room...", room.id);
    // If the room is empty, remove it from the storage
    if (!io.sockets.adapter.rooms.has(room.id)) Rooms.removeRoom(room.id);
  });
}
