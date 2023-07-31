import styles from "./App.module.css";
import { useState, useEffect } from "react";
import getSocketConnection from "./socketService";

const PokerPage = () => {
  const [users, setUsers] = useState<string[]>([]);

  const socket = getSocketConnection();

  useEffect(() => {
    socket.on("updateUsers", (updatedUsers: string[]) => {
      setUsers(updatedUsers);
    });
  }, [socket]);

  return (
    <div style={{ color: "white" }} className={styles.center}>
      {users}
    </div>
  );
};

export default PokerPage;
