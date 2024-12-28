import React, { useContext } from "react";
import { List } from "@mui/material";
import RoomPlayer from "./RoomPlayer";
import { RoomStateContext } from "../context";

export default function () {
  const { roomState } = useContext(RoomStateContext);

  return (
    <List dense>
      {roomState.users?.map((user) => (
        <RoomPlayer key={user.name} user={user} />
      ))}
    </List>
  );
}
