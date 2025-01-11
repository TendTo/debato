import {
  Box,
  Button,
  Card as MuiCard,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, {
  ChangeEvent,
  useActionState,
  useCallback,
  useEffect,
  useContext,
  useRef,
  useState,
} from "react";
import { WebSocket } from "../api";
import { UserStateContext } from "../context";
import { apiErrorToString } from "../utils";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  maxWidth: "500px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

async function socketLogin(formData: FormData | null): Promise<string | null> {
  if (formData === null) return null;
  const name = formData.get("name")?.toString();
  const roomId = formData.get("roomId")?.toString();
  if (name === undefined) return "Name is required";
  if (roomId && !/^[A-Z1-9]{4}$/.test(roomId)) return "Incorrect room code";
  try {
    const error = roomId
      ? await WebSocket.instance.emitWithAck("joinRoom", roomId, name)
      : await WebSocket.instance.emitWithAck("createRoom", name);
    console.log("socketLogin", error);
    return error ? apiErrorToString(error) : null;
  } catch (e) {
    console.error("socketLogin", e);
    return "Timeout joining room";
  }
}

export default function () {
  const [buttonLabel, setButtonLabel] = useState("Create room");
  const { setUserState } = useContext(UserStateContext);
  const nameRef = useRef<HTMLInputElement>(null);

  const onRoomIdChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setButtonLabel("Join room");
    } else {
      setButtonLabel("Create room");
    }
  }, []);

  const [error, submitAction, isPending] = useActionState<
    string | null,
    FormData | null
  >(async (_: null | string, formData: FormData | null) => {
    return await socketLogin(formData);
  }, null);

  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const roomId = localStorage.getItem("roomId") || "";
    const timestamp = localStorage.getItem("timestamp");
    nameRef.current!.value = name;
    if (name && roomId && timestamp) {
      const timeDiff = Date.now() - parseInt(timestamp);
      if (timeDiff > 1000 * 60 * 60 * 24) {
        localStorage.removeItem("roomId");
        localStorage.removeItem("timestamp");
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("roomId", roomId);
      socketLogin(formData).then((error) => {
        if (!error) {
          setUserState({ name, id: "", isOwner: false });
        }
        localStorage.removeItem("roomId");
        localStorage.removeItem("timestamp");
      });
    }
  }, []);

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Welcome to Debato
        </Typography>
        <Box
          component="form"
          action={submitAction}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              autoFocus
              required
              fullWidth
              variant="outlined"
              inputRef={nameRef}
              slotProps={{
                htmlInput: {
                  maxLength: 20,
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="roomId">Room code</FormLabel>
            <TextField
              name="roomId"
              placeholder="ABC1"
              type="text"
              id="roomId"
              fullWidth
              slotProps={{
                htmlInput: {
                  pattern: "[A-Z1-9]{4}",
                },
              }}
              variant="outlined"
              onChange={onRoomIdChange}
            />
          </FormControl>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isPending}
          >
            {buttonLabel}
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
