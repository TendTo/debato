import { Server } from "socket.io";
import {
  createRoom,
  joinRoom,
  leaveRoom,
  castVote,
  chooseAntithesis,
  updateConfiguration,
} from "./src/index";
import { ClientToServerEvents, ServerToClientEvents } from "@debato/api";

const port = Number.parseInt(process.env.PORT ?? "8000");
const io = new Server<ClientToServerEvents, ServerToClientEvents>(port, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  socket.on("createRoom", createRoom(io, socket));
  socket.on("joinRoom", joinRoom(io, socket));
  socket.on("leaveRoom", leaveRoom(io, socket));
  socket.on("updateConfiguration", updateConfiguration(io, socket));
  socket.on("chooseAntithesis", chooseAntithesis(io, socket));
  socket.on("castVote", castVote(io, socket));
  socket.on("disconnecting", leaveRoom(io, socket));
});
