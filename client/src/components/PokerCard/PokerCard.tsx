import { Box, Text } from "@chakra-ui/react";

interface IPokerCard {
  number: number;
  clicked: boolean;
}

const PokerCard = ({ number, clicked }: IPokerCard) => {
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
    >
      <Text>{number}</Text>
    </Box>
  );
};

export default PokerCard;
