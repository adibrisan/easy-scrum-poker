import { Avatar, Flex, Text, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import styles from "./HeaderBar.module.css";

const HeaderBar = () => {
  const { userData } = useContext(UserDataContext);
  return (
    <Flex justifyContent="space-between" top={0}>
      <Box display="inline-block" position="relative" p={7}>
        <Text
          className={styles.neonLetter}
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
        <Avatar
          name={`${userData.userName.charAt(0)}`}
          size="lg"
          bg="teal.500"
          color="white"
        />
        <Text
          className={styles.neonLetter}
          as="span"
          sx={{
            color: "white",
            padding: "0.2rem 0.4rem",
            borderRadius: "0.2rem",
            fontSize: "24px",
          }}
          color="white"
        >
          {userData.userName}
        </Text>
      </Box>
    </Flex>
  );
};

export default HeaderBar;
