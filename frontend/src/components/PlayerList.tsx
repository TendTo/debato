import React, { useMemo } from "react";
import { ListItem } from "@mui/material";
import ScaleIcon from "@mui/icons-material/Scale";
import { PlayerState, Role } from "@debato/api";
import PlayerListItem from "./PlayerListItem";

type Props = {
  players: PlayerState[];
  roles?: Role | Role[];
  callback?: (player: PlayerState) => void;
};

export default function ({ players, roles, callback }: Props) {
  const filteredPlayers = useMemo(
    () =>
      players.filter((player) => {
        if (!roles) return true;
        if (Array.isArray(roles)) return roles.includes(player.role);
        return player.role === roles;
      }),
    [players, roles]
  );

  return (
    <ListItem secondaryAction={<ScaleIcon />}>
      {filteredPlayers.map((player) => (
        <PlayerListItem key={player.name} player={player} callback={callback} />
      ))}
    </ListItem>
  );
}
