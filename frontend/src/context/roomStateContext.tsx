import { defaultConfiguration, RoomState, UserState } from "@debato/api";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { WebSocket } from "../api";

interface ExtendedRoomState extends RoomState {
  user: UserState;
}

export interface RoomStateContextType {
  roomState: ExtendedRoomState;
  setRoomState: React.SetStateAction<RoomState>;
}

const defaultValue: RoomStateContextType = {
  roomState: {
    users: [],
    configuration: defaultConfiguration,
    roomId: "",
    user: { name: "", id: "", isOwner: false },
  },
  setRoomState: () => defaultValue.roomState,
};

export const RoomStateContext =
  createContext<RoomStateContextType>(defaultValue);

export default function ({ children }) {
  const [roomState, extendedSetRoomState] = useState(defaultValue.roomState);

  const setRoomState = useCallback(
    (roomState: RoomState) => {
      const user = roomState.users.find(
        (u) => u.id === WebSocket.instance.socket.id
      ) ?? { name: "", id: "", isOwner: false };
      extendedSetRoomState({ ...roomState, user });
      return roomState;
    },
    [extendedSetRoomState]
  );

  useEffect(() => {
    console.log("WebSocket.instance.on updatedRoom");
    WebSocket.instance.on("updatedRoom", (roomState) => {
      console.log(roomState);
      setRoomState(roomState);
    });
    // WebSocket.instance.on("updatedRoom", setRoomState);
  }, [setRoomState]);

  return (
    <RoomStateContext value={{ roomState, setRoomState }}>
      {children}
    </RoomStateContext>
  );
}
