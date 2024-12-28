import { UserState } from "@debato/api";
import React, { createContext, useState } from "react";

export interface UserStateContextType {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const defaultValue: UserStateContextType = {
  userState: { name: "", id: "", isOwner: false },
  setUserState: () => void 0,
};

export const UserStateContext = createContext(defaultValue);

export default function ({ children }) {
  const [userState, setUserState] = useState(defaultValue.userState);
  return (
    <UserStateContext value={{ userState, setUserState }}>
      {children}
    </UserStateContext>
  );
}
