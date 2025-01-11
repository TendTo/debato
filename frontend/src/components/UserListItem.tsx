import React, { useCallback } from "react";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserState } from "@debato/api";

type Props = {
  user: UserState;
};

export default function ({ user }: Props) {
  const kick = useCallback(async () => {
    // socket.emit("kickPlayer", name);
    console.log("Kicking player", user.name);
  }, [user.name]);

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={kick}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={user.name} secondary={user.isOwner ? "Owner" : ""} />
    </ListItem>
  );
}
