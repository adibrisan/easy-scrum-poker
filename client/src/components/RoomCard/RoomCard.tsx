import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import getSocketConnection from "../../socketService";

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
  const navigate = useNavigate();
  const marginValue = useBreakpointValue({ base: "20px", md: "0", lg: "20px" });
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [userNameJoin, setUserNameJoin] = useState("");
  const [showErrorJoin, setShowErrorJoin] = useState(false);
  const [showError, setShowError] = useState(false);

  const socket = getSocketConnection();

  useEffect(() => {
    if (userName.trim() !== "") {
      setShowError(false);
    }
    if (roomId) {
      navigate(`/${roomId}`);
    }
  }, [userName, roomId, navigate]);

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleUserNameJoinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameJoin(e.target.value);
  };

  const handleCreateRoom = () => {
    if (userName.trim() === "") {
      setShowError(true);
    } else {
      console.log("Creating room with user name:", userName);
      socket.emit("createRoom", userName);
      socket.on("roomCreated", (roomIdFromServer: string) => {
        setRoomId(roomIdFromServer);
        console.log("bbbbb", roomIdFromServer); // Store the roomId in state
      });
    }
  };

  const handleJoinRoom = () => {
    // Emit the 'joinRoom' event to the server with the roomId and user's name
    socket.emit("joinRoom", joinRoomId, userNameJoin);
    console.log("roomiD", joinRoomId);

    // Listen for 'userJoined' event from the server and update the user list
    socket.on("userJoined", (usersInRoom) => {
      // You can update the UI to display the list of users in the room
      console.log("Users in room:", usersInRoom);
    });

    // Listen for 'roomNotFound' event from the server
    socket.on("roomNotFound", () => {
      console.log("Room not found. Please check the room ID and try again.");
    });
  };

  return (
    <Box
      width="300px"
      height="300px"
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
        {mode === "join" ? (
          <>
            <Input
              placeholder="Enter your name"
              value={userNameJoin}
              onChange={handleUserNameJoinChange}
              focusBorderColor="teal.500"
              color="#ffffff"
              size="lg"
              sx={{
                borderColor: showError ? "red.500" : "inherit",
                "::placeholder": { color: "white" },
              }}
            />
            <Input
              placeholder={inputText}
              value={joinRoomId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setJoinRoomId(e.target.value)
              }
              focusBorderColor="teal.500"
              color="#ffffff"
              size="lg"
              sx={{
                borderColor: showError ? "red.500" : "inherit",
                "::placeholder": { color: "white" },
              }}
            />
          </>
        ) : (
          <Input
            placeholder="Enter your name"
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
        )}

        {showError && (
          <Box
            color="red.100"
            fontSize="xl"
            top={mode === "join" ? 120 : 35}
            position="absolute"
          >
            {mode === "create"
              ? "Name is required"
              : "Room id and name are required"}
          </Box>
        )}

        <Button
          size="lg"
          colorScheme="teal"
          onClick={mode === "join" ? handleJoinRoom : handleCreateRoom}
        >
          {buttonTitle}
        </Button>
      </VStack>
    </Box>
  );
};

export default RoomCard;
