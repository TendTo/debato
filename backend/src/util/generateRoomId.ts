import { ROOM_ID_LENGTH } from "./constants";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

export default function generateRoomId() {
  let result = "";
  for (let i = 0; i < ROOM_ID_LENGTH; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return result;
}
