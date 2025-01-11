import React, { useActionState, useContext } from "react";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { WebSocket } from "../api";
import { Role, Vote } from "@debato/api";
import { GameStateContext } from "../context";

type Value = "abstain" | "thesis" | "antithesis";

export default function () {
  const { gameState } = useContext(GameStateContext);
  const [value, setValue] = React.useState<Value>("abstain");

  const [submitted, voteAction, isPending] = useActionState<boolean>(
    (_: boolean) => {
      console.log("castVote", value);
      WebSocket.instance.emit(
        "castVote",
        value === "abstain"
          ? Vote.ABSTAIN
          : value === "thesis"
          ? Vote.THESIS
          : Vote.ANTITHESIS
      );
      return true;
    },
    false
  );

  const [endSubmitted, endVotingAction, endIsPending] = useActionState<boolean>(
    (_: boolean) => {
      WebSocket.instance.emit("endVote");
      return true;
    },
    false
  );

  return (
    <Box>
      <h1>Vote who you prefer!</h1>
      <Box component={"form"} action={voteAction}>
        <ToggleButtonGroup
          color="primary"
          value={value}
          exclusive
          onChange={(_, value) => setValue(value)}
        >
          <ToggleButton value="abstain">Abstain</ToggleButton>
          <ToggleButton value="thesis">Thesis</ToggleButton>
          <ToggleButton value="antithesis">Antithesis</ToggleButton>
        </ToggleButtonGroup>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isPending || submitted}
        >
          Submit
        </Button>
      </Box>
      {gameState.player.role === Role.MEDIATOR && (
        <Box component={"form"} action={endVotingAction}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={endIsPending || endSubmitted}
          >
            End voting
          </Button>
        </Box>
      )}
    </Box>
  );
}
