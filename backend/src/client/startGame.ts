import type { Server } from "socket.io";
import { handler, DebatoSocket } from "../util";
import { Rooms } from "../data";
import { ErrorAcknowledgment } from "@debato/api";

export default function (io: Server, socket: DebatoSocket) {
  return handler((ack: ErrorAcknowledgment) => {
    const room = Rooms.getRoomFromSocket(socket);
    room.startGame();
    console.log("Starting game...");
    ack({});
    room.emitUpdatedGame(socket);
  });
}
