import styles from "./PokerPage.module.css";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { checkUser } from "./utils/checkForRealUser";
import { User } from "./utils/checkForRealUser";
import getSocketConnection from "./socketService";
import { io } from "socket.io-client";

import PokerCard from "./components/PokerCard/PokerCard";
import { storyPointsInDays } from "./utils/storyPoints";
import { UserDataContext } from "./context/UserDataContext";

const PokerPage = () => {
  const location = useLocation();
  //   console.log(location);
  const { userData, setUserData } = useContext(UserDataContext);
  const [users, setUsers] = useState<User[]>([]);

  const socket = getSocketConnection();
  const roomId = localStorage.getItem("roomId");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  //   console.log("inroom", localStorage.getItem("roomId"));

  useEffect(() => {
    socket.on("allUserVotes", (allUserVotes) => {
      console.log("ALLLLLLLL", allUserVotes);
      // Update your UI to display allUserVotes
      // For example, you can iterate through allUserVotes and display names and votes.
    });
  }, [socket]);

  useEffect(() => {
    if (userName) {
      setUserData((prev) => ({ ...prev, userName, roomId, userId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      query: { userData }, // Send the user ID on connection
    });

    newSocket.on("connect", () => {
      localStorage.setItem("socketId", newSocket.id);
      newSocket.emit("joinRoom", userData);
      newSocket.emit("roomId", roomId);
      newSocket.on("updateUsers", (updatedUsers: User[]) => {
        const roomUsers = checkUser(updatedUsers, roomId as string);
        console.log("UPDATE", updatedUsers, checkUser(updatedUsers, roomId));

        // setUserData(roomUsers.filter((user) => user.userId === userId)[0]);
        setUsers(roomUsers);
      });
    });
    // console.log("things", roomId, userId);
    // setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, userId, userName, userData]);

  return (
    <div className={styles.cardsContainer}>
      <div style={{ color: "white" }}>Your vote:{userData.storyPoints}</div>
      <div className={styles.yourCard}>
        <PokerCard number={userData.storyPoints} />
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
