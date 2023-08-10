const express = require('express');
const app = express();
const server = require('http').createServer(app);
// const { Server } = require("socket.io");
const socketServer = require("socket.io")(server);
const userBase = require("./Dbase/users");
server.listen(3000, () => {
    console.log("Listening on port 3000");
});

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html");
});

app.get("/script.js",(req , resp)=>{
    resp.sendFile(__dirname+"/script.js")
})

socketServer.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.on("Connected userName",(userName)=>{
        let userData = userBase.getUser(userName);
        console.log(userData) 
        
        if(!userData){
            userData=userBase.setUser(socket,userName,"Nickname")  
            console.log("No data")
        }

        //socket.emit("user updated",userData)
    })
    socket.on('chat message', (msg) => {
        console.log("Message from client:", msg);
        socket.broadcast.emit("chat from server", msg);
    });
});


