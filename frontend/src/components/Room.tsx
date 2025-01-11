import React, { useContext } from "react";
import { GameStateContext, RoomStateContext } from "../context";
import { Box } from "@mui/material";
import UserList from "./UserList";
import { GamePhase, Role } from "@debato/api";
import Lobby from "./Lobby";
import ChooseMediator from "./ChooseMediator";
import ChooseOthers from "./ChooseOthers";
import DebateMediator from "./DebateMediator";
import DebateOthers from "./DebateOthers";
import VoteJudges from "./VoteJudges";
import VoteOthers from "./VoteOthers";
import EndRound from "./EndRound";

function componentForPhase(role: Role, phase: GamePhase) {
  switch (phase) {
    case GamePhase.NOT_STARTED:
      return <Lobby />;
    case GamePhase.CHOOSE:
      return role === Role.MEDIATOR ? <ChooseMediator /> : <ChooseOthers />;
    case GamePhase.DEBATE:
      return role === Role.MEDIATOR ? <DebateMediator /> : <DebateOthers />;
    case GamePhase.VOTE:
      return role === Role.JUDGE || role === Role.MEDIATOR ? (
        <VoteJudges />
      ) : (
        <VoteOthers />
      );
    case GamePhase.END:
      return <EndRound />;
    default:
      throw new Error("Invalid game phase");
  }
}

export default function () {
  const { roomState } = useContext(RoomStateContext);
  const { gameState } = useContext(GameStateContext);

  return (
    <Box>
      <h1>Room id: {roomState.roomId}</h1>
      <UserList />
      {componentForPhase(gameState.player.role, gameState.phase)}
    </Box>
  );
}
