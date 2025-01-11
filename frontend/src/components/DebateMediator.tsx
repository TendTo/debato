import React, { useActionState, useContext } from "react";
import { Box, Button } from "@mui/material";
import { GameStateContext } from "../context";
import { WebSocket } from "../api";

export default function () {
  const { gameState } = useContext(GameStateContext);

  const [_, endDebateAction, isPending] = useActionState<
    null | string,
    FormData
  >((_: null | string, formData: FormData) => {
    WebSocket.instance.emit("endDebate");
    return null;
  }, null);

  return (
    <Box>
      <h1>Let the two sides debate</h1>
      <h2>Thesis: {gameState.thesis}</h2>
      When you are ready, click the button to end the debate.
      <Box component={"form"} action={endDebateAction}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isPending}
        >
          End Debate
        </Button>
      </Box>
    </Box>
  );
}
