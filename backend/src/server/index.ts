import newPlayer from "./newPlayer";

export interface ServerToClientEvents {
  newPlayer: ReturnType<typeof newPlayer>;
}

export { default as newPlayer } from "./newPlayer";
