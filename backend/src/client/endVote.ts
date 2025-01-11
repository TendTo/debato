import type { Server } from "socket.io";
import { handler, DebatoSocket } from "../util";
import { Rooms } from "../data";

export default function (io: Server, socket: DebatoSocket) {
  return handler(() => {
    const room = Rooms.getRoomFromSocket(socket);
    room.endVote(socket);
    console.log("Ending vote...");
    room.emitUpdatedGame(socket);
  });
}
