import { ClientToServerEvents, ServerToClientEvents } from "@debato/api";
import { Socket } from "socket.io";

export type DebatoSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
