import { ErrorType, RoomState } from "@debato/api";
import React, { createContext, useMemo, useState } from "react";
import { WebSocket } from "../api";

export interface RoomStateContextType {
  roomState: RoomState;
  setRoomState: React.Dispatch<React.SetStateAction<RoomState>>;
}

const defaultValue: RoomStateContextType = {
  roomState: { error: ErrorType.NOT_LOGGED_IN_ERROR, errorMessage: "" },
  setRoomState: () => void 0,
};

export const RoomStateContext =
  createContext<RoomStateContextType>(defaultValue);

export default function ({ children }) {
  const [roomState, setRoomState] = useState(defaultValue.roomState);

  useMemo(() => {
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
