import PlayingCard from "../PlayingCard/PlayingCard";
import { List, ListItem, Text } from "@chakra-ui/react";
import styles from "./PlayersList.module.css";

interface User {
  userName: string;
  roomId: string;
  socketId: string;
  storyPoints: number;
  userId: string;
}

interface IPlayersList {
  users: User[];
  isRevealed: boolean;
}

const PlayersList = ({ users, isRevealed }: IPlayersList) => {
  const userList = users?.map((user: User, index: number) => (
    <ListItem key={index} className={styles.container}>
      <Text fontSize="4xl" color="white" textAlign="center">
        {user.userName}
        {/* <img src={PokerBacked} alt="poker card backed" /> */}
      </Text>
      <PlayingCard
        points={user.storyPoints === -1 ? "?" : user.storyPoints}
        isRevealed={isRevealed}
      />
    </ListItem>
  ));

  return (
    <List className={styles.containerList} spacing={3}>
      {userList}
    </List>
  );
};

export default PlayersList;
