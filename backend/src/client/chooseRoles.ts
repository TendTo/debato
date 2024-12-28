import type { Server } from "socket.io";
import { handler, type DebatoSocket } from "../util";
import { nameSchema } from "./schema";
import { Rooms } from "../data";

export default function (io: Server, socket: DebatoSocket) {
  return handler((antithesisPlayerName: string) => {
    const room = Rooms.getRoomFromSocket(socket);
    room.chooseRoles(socket, antithesisPlayerName);
    console.log("Chosen antithesis", socket.id, antithesisPlayerName);
    room.emitUpdatedGame(socket);
  }, nameSchema);
}
