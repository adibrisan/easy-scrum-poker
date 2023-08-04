const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

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

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(
    "has joined again",
    socket.handshake.query.userId,
    "and its name:",
    socket.handshake.query.userName
  );
  const userIdReconnected = socket.handshake.query.userId;
  const userNameReconnected = socket.handshake.query.userName;
  socket.on("createRoom", (userName) => {
    // Generate a random room ID
    const roomId = generateRoomId();

    // Create a new room with the room ID and the user's name
    rooms.set(roomId, [userName]);

    // Join the socket to the room
    socket.join(roomId);

    // Emit the room ID back to the client
    socket.emit("roomCreated", roomId);

    console.log(`Room created: ${roomId} for user:${userName}`);
  });

  socket.on("joinRoom", (roomId, userName) => {
    // Check if the room exists
    if (userIdReconnected) {
      userRoomMap.set(userIdReconnected, roomId);
      console.log("userRoomMap", userRoomMap);
      usersPresent.add(userNameReconnected);
      rooms.set(roomId, usersPresent);
      socket.join(roomId);
    } else if (rooms.has(roomId)) {
      // Add the user's name to the list of users in the room
      const usersInRoom = Array.from(rooms.get(roomId)) || [];
      usersInRoom.push(userName);
      rooms.set(roomId, usersInRoom);

      // Join the socket to the room
      socket.join(roomId);

      // Emit the updated user list to all users in the room
      io.to(roomId).emit("userJoined", usersInRoom);
      io.to(roomId).emit("updateUsers", rooms.get(roomId));
    } else {
      // If the room does not exist, you can handle the situation accordingly
      // For example, emit a "roomNotFound" event back to the user
      socket.emit("roomNotFound");
    }
    console.log("roomremain", rooms);
    io.to(roomId).emit("updateUsers", Array.from(rooms.get(roomId)));
    socket.on("disconnect", () => {
      //   if (roomId) {
      //     const userIndex = rooms.get(roomId)?.indexOf(userName);
      //     if (userIndex !== -1) {
      //       rooms.get(roomId)?.splice(userIndex, 1);
      //     }
      //   }

      userRoomMap.delete(userIdReconnected);
      rooms.delete(roomId);
      // Emit the updated user list to all clients in the room
      io.to(roomId).emit("updateUsers", rooms.get(roomId));
    });
  });
});

// Start the server on port 3001 (or any other port of your choice)
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
