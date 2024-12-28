import { WebSocket } from "../api";
import React, { useActionState, useContext } from "react";
import { Box, IconButton } from "@mui/material";
import { RoomStateContext } from "../context";
import { ErrorType } from "@debato/api";
import LogoutIcon from "@mui/icons-material/Logout";

export default function () {
  const { roomState, setRoomState } = useContext(RoomStateContext);
  const [error, submitAction, isPending] = useActionState(() => {
    if (roomState.error !== undefined) return "Not in a room";
    WebSocket.instance.emit("leaveRoom");
    setRoomState({ error: ErrorType.NOT_LOGGED_IN_ERROR, errorMessage: "" });
    localStorage.removeItem("timestamp");
    localStorage.removeItem("roomId");
    return null;
  }, null);

  return (
    <Box component="form" action={submitAction}>
      <IconButton type="submit" disabled={isPending}>
        <LogoutIcon />
      </IconButton>
      {error && <p>{error}</p>}
    </Box>
  );
}
