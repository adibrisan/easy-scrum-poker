import styles from "./PokerPage.module.css";
import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import getSocketConnection from "./socketService";

import PokerCard from "./components/PokerCard/PokerCard";
import { storyPointsInDays } from "./utils/storyPoints";

const PokerPage = () => {
  const [users, setUsers] = useState<string[]>([]);

  const socket = getSocketConnection();

  useEffect(() => {
    socket.on("updateUsers", (updatedUsers: string[]) => {
      setUsers(updatedUsers);
    });
  }, [socket]);

  return (
    <div className={styles.cardsContainer}>
      {users}
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
