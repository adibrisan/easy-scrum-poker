import { List, ListItem, ListIcon, Text } from "@chakra-ui/react";

interface User {
  userName: string;
  roomId: string;
  socketId: string;
  storyPoints: number;
  userId: string;
}

const PlayersList = ({ users }: User[]) => {
  console.log("users", users);
  const userList = users?.map((user: User, index: number) => (
    <ListItem key={index}>
      {/* <ListIcon as={MdCheckCircle} color="green.500" /> */}
      <Text fontSize="4xl">
        {user.userName}: {user.storyPoints === -1 ? "?" : user.storyPoints}
      </Text>
    </ListItem>
  ));

  return <List spacing={3}>{userList}</List>;
};

export default PlayersList;
