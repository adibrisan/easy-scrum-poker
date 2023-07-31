import React, { createContext, ReactNode, useState } from "react";

export interface UserData {
  name: string;
  roomId: string;
  storyPoints: number;
}

interface IUserDataContext {
  userData: UserData;
  setUserData: (value: UserData) => void;
}

const initialValues = {
  userData: {
    name: "",
    roomId: "",
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
  console.log("context", userData);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
