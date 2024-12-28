import type { Server } from "socket.io";
import { handler, DebatoSocket } from "../util";
import { Rooms, VoteCode } from "../data";
import { roomIdSchema, voteSchema } from "./schema";

export default function (io: Server, socket: DebatoSocket) {
  return handler((vote: VoteCode) => {
    const room = Rooms.getRoomFromSocket(socket);
    room.vote(socket, vote);
    console.log("Casted vote...", socket.id, vote);
    room.emitUpdatedGame(socket);
  }, voteSchema);
}
