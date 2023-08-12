import React, { createContext, ReactNode, useState } from "react";

export interface UserData {
  userName: string;
  roomId: string;
  socketId: string;
  storyPoints: number;
}

interface IUserDataContext {
  userData: UserData;
  setUserData: (value: UserData) => void;
}

const initialValues = {
  userData: {
    userName: "",
    roomId: "",
    socketId: "",
    storyPoints: -1,
  },
  setUserData: () => {},
};
interface ProviderProps {
  children: ReactNode;
}

export const UserDataContext = createContext<IUserDataContext>(initialValues);

export const UserDataProvider: React.FC<ProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState(initialValues.userData);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
