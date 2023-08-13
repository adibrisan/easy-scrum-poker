const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

function generateRoomId() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

const rooms = new Map();
const userRoomMap = new Map();
const usersPresent = new Set();
const userVotes = {};
const updatedUserInCertainRoom = new Map();

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(
    "has joined again",
    socket.handshake.query.userData,
    "and its name:",
    socket.handshake.query.userName
  );
  const userReconnected = socket.handshake.query.userData;
  // const userNameReconnected = socket.handshake.query.userName;
  socket.on("createRoom", (userInfo) => {
    // Generate a random room ID
    const roomId = generateRoomId();

    // Create a new room with the room ID and the user's name
    rooms.set(userInfo, roomId);

    // Join the socket to the room
    socket.join(roomId);

    // Emit the room ID back to the client
    socket.emit("roomCreated", roomId);

    console.log(`Room created: ${roomId} for user:${userInfo.userName}`);
    checkRealUser(rooms);
  });

  socket.on("isRevealed", (isRevealed, roomId) => {
    console.log("IS REVEALED IS REVEALED", isRevealed, roomId);
    io.to(roomId).emit("sentIsReveal", isRevealed);
    // socket.emit("sentIsReveal", isRevealed);
  });

  socket.on("userVote", (userVote) => {
    userVotes[userVote.userName] = userVote.storyPoints;
    console.log("dsadsadasdsa", userVotes);
    io.emit("allUserVotes", userVotes); // Broadcast all user votes to all clients
  });

  socket.on("joinRoom", (userInfo) => {
    userInfo.socketId = socket.id;
    // Check if the room exists
    if (userReconnected) {
      userRoomMap.set(userReconnected, userInfo.roomId);
      // console.log("userRoomMap", userRoomMap);
      // usersPresent.add(userNameReconnected);
      rooms.set(userInfo, userInfo.roomId);
      socket.on("roomId", (roomId) => {
        const updatedUsers = getKeyByValue(rooms, roomId);
        updatedUserInCertainRoom.set(roomId, updatedUsers);
        io.to(roomId).emit("updateUsers", Array.from(rooms.keys()));
      });

      socket.join(userInfo.roomId);
    } else if (rooms.has(userInfo.roomId)) {
      checkRealUser(rooms);
      // Add the user's name to the list of users in the room
      const usersInRoom = rooms.get(userInfo) || [];
      usersInRoom.push(userInfo.userName);
      rooms.set(userInfo, userInfo.roomId);

      // Join the socket to the room
      socket.join(userInfo.roomId);

      // Emit the updated user list to all users in the room
      // io.to(userInfo.roomId).emit("userJoined", usersInRoom);
      socket.on("roomId", (roomId) => {
        const updatedUsers = getKeyByValue(rooms, roomId);
        updatedUserInCertainRoom.set(roomId, updatedUsers);
        io.to(roomId).emit("updateUsers", Array.from(rooms.keys()));
      });
    } else {
      checkRealUser(rooms);
      // If the room does not exist, you can handle the situation accordingly
      // For example, emit a "roomNotFound" event back to the user
      socket.emit("roomNotFound");
    }
    checkRealUser(rooms);
    console.log("roomremain", rooms);
    // console.log("updated", Array.from(updatedUserInCertainRoom.values()));
    // console.log(rooms.get(userInfo));
    // io.to(userInfo.roomId).emit("updateUsers", rooms.get(userInfo));
    socket.on("disconnect", () => {
      checkRealUser(rooms);
      //   if (roomId) {
      //     const userIndex = rooms.get(roomId)?.indexOf(userName);
      //     if (userIndex !== -1) {
      //       rooms.get(roomId)?.splice(userIndex, 1);
      //     }
      //   }
      const socketIds = [];
      socketIds.push(socket.id);
      rooms.forEach((_value, key) => {
        // console.log("key", key.socketId);

        if (key.socketId === socketIds[0]) {
          rooms.delete(key);
        }
      });
      for (const [key, value] of updatedUserInCertainRoom) {
        if (value?.socketId === socketIds[0]) {
          updatedUserInCertainRoom.delete(key);
        }
      }
      // userRoomMap.delete(userReconnected);
      // rooms.delete(userInfo.roomId);
      // Emit the updated user list to all clients in the room
      io.to(userInfo.roomId).emit("updateUsers", Array.from(rooms.keys()));
    });
  });
});

function checkRealUser(map) {
  for (const key of map) {
    if (!key?.userName || key.userName === "" || key.roomId === "") {
      map.delete(key);
    }
  }
}

function getKeyByValue(map, targetValue) {
  for (const [key, value] of map.entries()) {
    if (value === targetValue) {
      return key;
    }
  }
  return null; // Return null if the value is not found
}

// Start the server on port 3001 (or any other port of your choice)
const PORT = process.env.SOCKET_IO_SERVER_PORT;
server.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
