import React, { useMemo } from "react";
import { Box, Zoom } from "@mui/material";
import { PlayerState, Role } from "@debato/api";
import PlayerCard from "./PlayerCard";

type Props = {
  players: PlayerState[];
  roles?: Role | Role[];
  callback?: (player: PlayerState) => void;
};

export default function ({ players, roles, callback }: Props) {
  const filteredPlayers = useMemo(
    () =>
      players.filter((player) => {
        if (roles === undefined) return true;
        if (Array.isArray(roles)) return roles.includes(player.role);
        return player.role === roles;
      }),
    [players, roles]
  );

  console.log(filteredPlayers);
  return (
    <Box sx={{ display: "flex" }}>
      {filteredPlayers.map((player) => (
        <PlayerCard key={player.name} player={player} callback={callback} />
      ))}
    </Box>
  );
}
