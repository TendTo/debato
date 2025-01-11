import React, { useActionState, useContext, useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { RoomStateContext } from "../context";
import { WebSocket } from "../api";

export default function () {
  const { roomState } = useContext(RoomStateContext);

  const [error, startGameAction, isPending] = useActionState<
    string | null,
    FormData
  >((_: string | null, formData: FormData) => {
    WebSocket.instance.emit("startGame");
    return null;
  }, null);

  return (
    <Box>
      <h1>There is no game in progress!</h1>
      {roomState.user.isOwner && (
        <Box
          component="form"
          action={startGameAction}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isPending || roomState.users.length < 3}
          >
            Start Game
          </Button>
        </Box>
      )}
    </Box>
  );
}
