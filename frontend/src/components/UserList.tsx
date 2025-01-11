import React, { useContext } from "react";
import { List } from "@mui/material";
import RoomPlayer from "./UserListItem";
import { RoomStateContext } from "../context";

export default function () {
  const { roomState } = useContext(RoomStateContext);

  return (
    <List dense>
      {roomState.users.map((user) => (
        <RoomPlayer key={user.name} user={user} />
      ))}
    </List>
  );
}
