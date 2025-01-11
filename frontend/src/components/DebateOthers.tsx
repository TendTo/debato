import React, { useContext, useMemo } from "react";
import { Box } from "@mui/material";
import { GameStateContext } from "../context";
import { Role } from "@debato/api";

export default function () {
  const { gameState } = useContext(GameStateContext);

  const message = useMemo(() => {
    switch (gameState.player.role) {
      case Role.THESIS:
        return "Defend your thesis";
      case Role.ANTITHESIS:
        return "Attack the thesis";
      default:
        return "Listen to the two sides and judge who is more convincing";
    }
  }, [gameState.player.role]);

  return (
    <Box>
      <h1>{message}</h1>
    </Box>
  );
}
