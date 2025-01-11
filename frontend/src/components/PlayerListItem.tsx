import React, { useCallback } from "react";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PlayerState } from "@debato/api";

type Props = {
  player: PlayerState;
  callback?: (player: PlayerState) => void;
};

export default function ({ player, callback }: Props) {
  const onClick = useCallback(() => {
    if (callback) callback(player);
  }, [callback, player]);

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onClick}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={player.name} secondary={player.points} />
    </ListItem>
  );
}
