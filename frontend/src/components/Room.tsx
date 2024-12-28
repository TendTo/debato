import React, { useContext } from "react";
import { RoomStateContext } from "../context";
import { Box } from "@mui/material";
import PlayerList from "./RoomPlayerList";

export default function () {
  const { roomState } = useContext(RoomStateContext);

  return (
    <Box>
      <h1>Room id: {roomState.error ? "" : roomState.roomId}</h1>
      <PlayerList />
    </Box>
  );
}
