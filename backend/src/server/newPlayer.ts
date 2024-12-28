import type { Socket } from "socket.io";

export default function newPlayer(socket: Socket) {
  console.log("New player...", socket);
  return null;
}
