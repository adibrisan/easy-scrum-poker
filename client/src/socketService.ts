import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const getSocketConnection = () => {
  // If the socket instance already exists, return it
  if (socket) {
    return socket;
  }

  // If the socket instance does not exist, try to retrieve the socket.id from localStorage
  const storedSocketId = localStorage.getItem("socketId");
  console.log("socket", storedSocketId);

  if (storedSocketId !== "undefined") {
    // Reestablish the socket connection using the stored socket.id
    socket = io("http://localhost:3001", {
      query: { socketId: storedSocketId },
    });
    // Store the socket.id in localStorage again (in case it was not stored previously)
    localStorage.setItem("socketId", socket.id);

    return socket;
  }

  // If there is no stored socket.id, create a new socket connection
  socket = io("http://localhost:3001");

  // Store the socket.id in localStorage
  console.log("sk", socket);

  localStorage.setItem("socketId", socket.id);

  return socket;
};

export default getSocketConnection;
