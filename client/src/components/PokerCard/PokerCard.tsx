import getSocketConnection from "../../socketService";
import { Box, Text } from "@chakra-ui/react";
import { UserDataContext } from "../../context/UserDataContext";
import { useContext } from "React";

interface IPokerCard {
  number: number;
  clicked: boolean;
}

const PokerCard = ({ number, clicked }: IPokerCard) => {
  const { userData, setUserData } = useContext(UserDataContext);
  //   console.log("userBOX", userData);

  const handlePokerCardClick = (storyNumber: number) => {
    const socket = getSocketConnection();
    localStorage.setItem("storyPoints", `${storyNumber}`);
    setUserData((prevData) => ({ ...prevData, storyPoints: storyNumber }));
    const user = {
      userName: userData.userName,
      roomId: userData.roomId,
      storyPoints: storyNumber,
    };
    socket.emit("userVote", user);
  };

  return (
    <Box
      w="60px"
      h="100px"
      mr={3}
      color="white"
      borderRadius="8px"
      border="2px solid #1e90ff"
      backgroundColor={clicked ? "#1e90ff" : "rgba(173, 216, 230, 0.7)"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize="24px"
      fontWeight="bold"
      cursor="pointer"
      transition="background-color 0.2s ease, transform 0.2s ease"
      _hover={{ backgroundColor: "#1e90ff" }}
      onClick={() => {
        handlePokerCardClick(number);
      }}
    >
      <Text>{number}</Text>
    </Box>
  );
};

export default PokerCard;
