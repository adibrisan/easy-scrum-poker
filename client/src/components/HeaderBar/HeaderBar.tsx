import { Avatar, Flex, Text, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { UserDataContext } from "../../context/UserDataContext";

const HeaderBar = () => {
  const { userData } = useContext(UserDataContext);
  return (
    <Flex justifyContent="space-between" top={0}>
      <Box display="inline-block" position="relative" p={7}>
        <Text
          as="span"
          sx={{
            background: "teal.500",
            color: "white",
            padding: "0.2rem 0.4rem",
            borderRadius: "0.2rem",
            fontSize: "24px",
          }}
        >
          P
        </Text>
        <Text
          as="span"
          sx={{
            color: "white",
            padding: "0.2rem 0.4rem",
            borderRadius: "0.2rem",
            fontSize: "24px",
          }}
        >
          lanning poker
        </Text>
      </Box>
      <Box display="inline-block" position="relative" p={7}>
        <Avatar name="A B" size="lg" bg="teal.500" color="white" />
        <Text
          as="span"
          sx={{
            color: "white",
            padding: "0.2rem 0.4rem",
            borderRadius: "0.2rem",
            fontSize: "24px",
          }}
          color="white"
        >
          {userData.name}
        </Text>
      </Box>
    </Flex>
  );
};

export default HeaderBar;
