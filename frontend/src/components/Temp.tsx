import React, { useActionState } from "react";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { WebSocket } from "../api";
import { Vote } from "@debato/api";

type Value = "abstain" | "thesis" | "antithesis";

export default function () {
  const [value, setValue] = React.useState<Value>("abstain");

  const [_, endDebateAction, isPending] = useActionState<null | string>(
    (_: null | string) => {
      console.log("castVote", value);
      WebSocket.instance.emit(
        "castVote",
        value === "abstain"
          ? Vote.ABSTAIN
          : value === "thesis"
          ? Vote.THESIS
          : Vote.ANTITHESIS
      );
      return null;
    },
    null
  );

  return (
    <Box>
      <h1>Vote who you prefer!</h1>
      <Box component={"form"} action={endDebateAction}>
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
          disabled={isPending}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
