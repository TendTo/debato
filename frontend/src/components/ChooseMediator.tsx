import React, { useCallback, useContext } from "react";
import { GameStateContext } from "../context";
import { Box } from "@mui/material";
import { PlayerState, Role } from "@debato/api";
import PlayerCards from "./PlayerCards";
import { WebSocket } from "../api";

export default function () {
  const { gameState } = useContext(GameStateContext);

  const chooseRoles = useCallback((player: PlayerState) => {
    console.log(player);
    WebSocket.instance.emit("chooseRoles", player.name);
  }, []);

  return (
    <Box>
      <h1>The thesis for this debate is: {gameState.thesis}</h1>
      <h2>Choose who will argue against the thesis</h2>
      <PlayerCards
        roles={Role.UNASSIGNED}
        players={gameState.players}
        callback={chooseRoles}
      />
    </Box>
  );
}
