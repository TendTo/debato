import type { Server } from "socket.io";
import { handler, DebatoSocket } from "../util";
import { Rooms } from "../data";
import { nameSchema, roomIdSchema } from "./schema";
import { ErrorAcknowledgment } from "@debato/api";

export default function (io: Server, socket: DebatoSocket) {
  return handler(
    (roomId: string, name: string, ack: ErrorAcknowledgment) => {
      const room = Rooms.getRoom(roomId);
      room.addUser(socket, name, false);
      room.emitUpdatedRoom(socket);
      ack({});
      console.log("Joining room...", roomId);
    },
    [roomIdSchema, nameSchema]
  );
}
