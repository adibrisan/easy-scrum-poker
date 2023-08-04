import styles from "./PokerPage.module.css";
import { useState, useEffect, useContext } from "react";
import { Box } from "@chakra-ui/react";
import getSocketConnection from "./socketService";
import { io } from "socket.io-client";

import PokerCard from "./components/PokerCard/PokerCard";
import { storyPointsInDays } from "./utils/storyPoints";
import { UserDataContext } from "./context/UserDataContext";

const PokerPage = () => {
  const { setUserData } = useContext(UserDataContext);
  const [users, setUsers] = useState<string[]>([]);

  const socket = getSocketConnection();
  const roomId = localStorage.getItem("roomId");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  //   console.log("inroom", localStorage.getItem("roomId"));

  useEffect(() => {
    if (userName) {
      setUserData((prev) => ({ ...prev, name: userName }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      query: { userId, userName }, // Send the user ID on connection
    });

    newSocket.on("connect", () => {
      newSocket.emit("joinRoom", roomId);
      newSocket.on("updateUsers", (updatedUsers: string[]) => {
        console.log("UPDATE", updatedUsers);
        setUsers((prevUsers) => [...prevUsers, ...updatedUsers]);
      });
    });
    console.log("things", roomId, userId);
    // setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, userId, userName]);

  useEffect(() => {}, [socket]);
  //   console.log("localstorage", localStorage.getItem("createdRoomId"));

  return (
    <div className={styles.cardsContainer}>
      <div style={{ color: "white" }}>{users}...</div>
      <div className={styles.yourCard}>
        <PokerCard number={0} />
      </div>
      <ul className={styles.cards}>
        {storyPointsInDays.map((storyPoint, index) => (
          <li key={index}>
            <PokerCard number={storyPoint} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokerPage;
