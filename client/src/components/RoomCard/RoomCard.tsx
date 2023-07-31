import { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

interface IRoomCard {
  title: string;
  buttonTitle: string;
  inputText: string;
  mode?: "create" | "join";
}

const RoomCard = ({
  title,
  buttonTitle,
  inputText,
  mode = "create",
}: IRoomCard) => {
  const marginValue = useBreakpointValue({ base: "20px", md: "0", lg: "20px" });
  const [userName, setUserName] = useState("");
  const [showError, setShowError] = useState(false);

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    if (userName.trim() !== "") {
      setShowError(false);
    }
  }, [userName]);

  const handleCreateRoom = () => {
    // Implement your logic to create the room with the user name
    if (userName.trim() === "") {
      setShowError(true);
    } else {
      console.log("Creating room with user name:", userName);
    }
  };

  return (
    <Box
      width="300px"
      height="200px"
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      margin={marginValue}
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" mb={4} color="whiteAlpha.800" pb={10}>
        {title}
      </Heading>

      <VStack spacing={20} position="relative">
        <Input
          placeholder={inputText}
          value={userName}
          onChange={handleUserNameChange}
          focusBorderColor="teal.500"
          color="#ffffff"
          size="lg"
          sx={{
            borderColor: showError ? "red.500" : "inherit",
            "::placeholder": { color: "white" },
          }}
        />
        {showError && (
          <Box color="red.500" fontSize="xl" top={35} position="absolute">
            {mode === "create" ? "Name is required" : "Room id is required"}
          </Box>
        )}

        <Button size="lg" colorScheme="teal" onClick={handleCreateRoom}>
          {buttonTitle}
        </Button>
      </VStack>
    </Box>
  );
};

export default RoomCard;
