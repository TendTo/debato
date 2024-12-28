import React from "react";
import {
  LoginStateProvider,
  GameStateProvider,
  UserStateProvider,
} from "../context";
import Main from "./Main.tsx";

export default function () {
  return (
    <LoginStateProvider>
      <GameStateProvider>
        <UserStateProvider>
          <Main />
        </UserStateProvider>
      </GameStateProvider>
    </LoginStateProvider>
  );
}
