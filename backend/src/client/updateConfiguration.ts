import type { Server } from "socket.io";
import { handler, type DebatoSocket } from "../util";
import { Rooms } from "../data";
import { configurationSchema } from "./schema";
import { RoomConfiguration } from "@debato/api";

export default function (io: Server, socket: DebatoSocket) {
  return handler((configuration: RoomConfiguration) => {
    const room = Rooms.getRoomFromSocket(socket);
    room.configuration = configuration;
    room.emitUpdatedRoom(socket);
    console.log("Updating configuration room...", room.id);
  }, configurationSchema);
}
