import React, { useCallback } from "react";
import { Box, Card, CardContent, Typography, Zoom } from "@mui/material";
import { PlayerState, Role } from "@debato/api";

type Props = {
  player: PlayerState;
  callback?: (player: PlayerState) => void;
};

export default function ({ player, callback }: Props) {
  const onClick = useCallback(() => {
    if (callback) callback(player);
  }, [callback, player]);

  return (
    <Card
      sx={{ minWidth: 275 }}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {player.name}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {player.role} | {player.points} points
        </Typography>
      </CardContent>
    </Card>
  );
}
