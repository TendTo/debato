import { Server } from "socket.io";
import {
  createRoom,
  joinRoom,
  leaveRoom,
  castVote,
  chooseRoles,
  updateConfiguration,
  endDebate,
  endVote,
} from "./src/index";
import { ClientToServerEvents, ServerToClientEvents } from "@debato/api";
import startGame from "./src/client/startGame";

const port = Number.parseInt(process.env.PORT ?? "8000");
const io = new Server<ClientToServerEvents, ServerToClientEvents>(port, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Rooms
  socket.on("createRoom", createRoom(io, socket));
  socket.on("joinRoom", joinRoom(io, socket));
  socket.on("leaveRoom", leaveRoom(io, socket));
  socket.on("disconnecting", leaveRoom(io, socket));
  // Configuration
  socket.on("updateConfiguration", updateConfiguration(io, socket));
  // Game
  socket.on("startGame", startGame(io, socket));
  socket.on("chooseRoles", chooseRoles(io, socket));
  socket.on("endDebate", endDebate(io, socket));
  socket.on("castVote", castVote(io, socket));
  socket.on("endVote", endVote(io, socket));
});
