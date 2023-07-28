const express = require('express');
const fs = require('fs');
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const socketServer = new Server(server);

server.listen(3000, () => {
    console.log("Listening on port 3000");
});

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.on('chat message', (msg) => {
        console.log("Message from client:", msg);
        socket.broadcast.emit("chat from server", msg);
    });
});
