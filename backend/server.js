const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer((req, res) => {
    if (req.url === "/") { // Handle root URL
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello, this is server!");
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

// Enable CORS for your frontend's origin (http://localhost:3000)
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Allow the frontend running on this port
        methods: ["GET", "POST"], 
    },
});

// Handle WebSocket connection
io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for the threshold_crossed event from the client
    socket.on("threshold_crossed", (data) => {
        console.log("Threshold crossed! Temperature:", data.value.temp , " at: " , data.value.time);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server on port 3001
server.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
