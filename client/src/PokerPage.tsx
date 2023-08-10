import styles from "./PokerPage.module.css";
import { Text, useToast, Box, Button } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { checkUser } from "./utils/checkForRealUser";
import { User } from "./utils/checkForRealUser";
import PlayersList from "./components/PlayersList/PlayersList";
import { BsShareFill } from "react-icons/bs";

import getSocketConnection from "./socketService";
import { io } from "socket.io-client";

import PokerCard from "./components/PokerCard/PokerCard";
import { storyPointsInDays } from "./utils/storyPoints";
import { UserDataContext } from "./context/UserDataContext";

const PokerPage = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const toast = useToast();
  const location = useLocation();
  const { userData, setUserData } = useContext(UserDataContext);
  const [users, setUsers] = useState<User[]>([]);
  //   console.log("USERS", users);

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
      newSocket.emit("isRevealed", isRevealed, roomId);
      newSocket.emit("joinRoom", userData);
      newSocket.emit("roomId", roomId);
      newSocket.on("updateUsers", (updatedUsers: User[]) => {
        const roomUsers = checkUser(updatedUsers, roomId as string);
        console.log("UPDATE", updatedUsers, checkUser(updatedUsers, roomId));

        // setUserData(roomUsers.filter((user) => user.userId === userId)[0]);
        setUsers(roomUsers);
      });
    });
    newSocket.on("sentIsReveal", (sentIsReveal: boolean) => {
      console.log("IS REVEALED", sentIsReveal);
      setIsRevealed(sentIsReveal);
    });
    // console.log("things", roomId, userId);
    // setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, userId, userName, userData, isRevealed]);
  console.log("IS REVEALED", isRevealed);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${location.pathname.split("/")[1]}`)
      .then(() => {
        console.log("Text copied to clipboard");
        toast({
          position: "top-right",
          render: () => (
            <Box color="white" p={3} bg="blue.500">
              <Text fontSize="4xl">Text copied to clipboard !</Text>
            </Box>
          ),
        });
      })
      .catch((err) => {
        console.error("Error copying text:", err);
        toast({
          position: "top-right",
          render: () => (
            <Box color="white" p={3} bg="red.500">
              <Text fontSize="4xl">Error copying text...</Text>
            </Box>
          ),
        });
      });
  };

  const toggleRevealCards = () => {
    setIsRevealed((prev) => !prev);
  };

  return (
    <div className={styles.pokerPageLayout}>
      <span className={styles.sendLink}>
        <span onClick={copyToClipboard}>
          <BsShareFill fill="white" size={25} />
          <Text fontSize="2xl" color="white">
            Share the invite code
          </Text>
        </span>
        <Button
          onClick={toggleRevealCards}
          colorScheme="blue"
          size="md"
          variant="solid"
          borderRadius="lg"
          width={80}
          height="30px"
          marginLeft={10}
          fontSize="15px"
        >
          {!isRevealed ? "Reveal Cards" : "Vote Again"}
        </Button>
      </span>
      <div className={styles.cardsContainer}>
        <PlayersList users={users} isRevealed={isRevealed} />
        <div className={styles.yourCard}>
          <PokerCard readOnly number={userData.storyPoints} />
        </div>
        <ul className={styles.cards}>
          {storyPointsInDays.map((storyPoint, index) => (
            <li key={index}>
              <PokerCard number={storyPoint} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokerPage;
