import type { Server } from "socket.io";
import { handler, DebatoSocket } from "../util";
import { Rooms } from "../data";

export default function (io: Server, socket: DebatoSocket) {
  return handler(() => {
    const room = Rooms.getRoomFromSocket(socket);
    room.startGame();
    console.log("Starting game...");
    room.emitUpdatedGame(socket);
  });
}
