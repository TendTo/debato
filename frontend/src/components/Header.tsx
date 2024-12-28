import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import React, { useContext } from "react";
import { UserStateContext } from "../context";
import LeaveRoomButton from "./LeaveRoomButton";

export default function () {
  const { userState } = useContext(UserStateContext);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AdbIcon />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              DEBATO
            </Typography>
          </Box>
          <Box>
            {!userState.name && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography noWrap>{userState.name}</Typography>
                <LeaveRoomButton />
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
