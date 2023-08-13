import getSocketConnection from "../../socketService";
import { Box, Text } from "@chakra-ui/react";
import { UserDataContext } from "../../context/UserDataContext";
import { useContext } from "react";
import styles from "./PokerCard.module.css";

interface IPokerCard {
  number: number;
  readOnly?: boolean;
}

const PokerCard = ({ number, readOnly = false }: IPokerCard) => {
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
    <div className={readOnly ? styles.yourScoreContainer : undefined}>
      {readOnly && (
        <Text
          fontSize="3xl"
          fontWeight="medium"
          color="white"
          textAlign="center"
        >
          Your score
        </Text>
      )}
      <Box
        w="60px"
        h="100px"
        mr={!readOnly ? 3 : undefined}
        color="white"
        borderRadius="8px"
        border="2px solid #1e90ff"
        backgroundColor={"rgba(173, 216, 230, 0.7)"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="24px"
        fontWeight="bold"
        cursor={!readOnly ? "pointer" : ""}
        transition="background-color 0.2s ease, transform 0.2s ease"
        _hover={!readOnly ? { backgroundColor: "#1e90ff" } : {}}
        onClick={
          !readOnly
            ? () => {
                handlePokerCardClick(number);
              }
            : undefined
        }
      >
        <Text>{number === -1 ? "?" : number}</Text>
      </Box>
    </div>
  );
};

export default PokerCard;
