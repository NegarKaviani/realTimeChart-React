import { io } from "socket.io-client";

// Connect to the server
const socket = io("http://localhost:3001");

// Event listener for successful connection
socket.on("connect", () => {
  console.log("Connected to server with id: " + socket.id); // 20-Characters unique id
});


// Function to send threshold notifications to the server
export const sendThresholdNotification = async (value: any) => {
  socket.emit("threshold_crossed", { value });
};
