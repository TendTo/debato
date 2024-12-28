import React, { useContext } from "react";
import { RoomStateContext, ThemeProvider } from "../context";
import Login from "./Login";
import Room from "./Room";
import Header from "./Header";
import { CssBaseline } from "@mui/material";

export default function () {
  const { roomState } = useContext(RoomStateContext);
  return (
    <ThemeProvider>
      <CssBaseline enableColorScheme />
      <Header />
      <main style={{ flexGrow: 1, width: "100%" }}>
        {roomState.roomId ? <Room /> : <Login />}
      </main>
    </ThemeProvider>
  );
}
