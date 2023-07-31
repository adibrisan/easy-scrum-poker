import { Avatar, Flex, Text, Box } from "@chakra-ui/react";

const HeaderBar = () => {
  // Use the useStyleConfig hook to get the base styles for the Text component

  return (
    <Flex justifyContent="space-between">
      <Box display="inline-block" position="relative" p={5}>
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
      <Box display="inline-block" position="relative" p={5}>
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
          User name
        </Text>
      </Box>
    </Flex>
  );
};

export default HeaderBar;
