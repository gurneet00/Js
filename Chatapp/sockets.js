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

    socket.on("Connected userName",UpdateConnectUser(socket))
    socket.on("update user",function(userData){
      //  console.log(userData)
        userBase.setUser(socket,userData.userName,userData.nickName)
        //UpdateConnectUser(socket,)
    })
    socket.on("search friend",function(friendName){
        searchfriend(friendName,socket)
    })


    socket.on('chat message', (ChatData) => {
        console.log("Message from client:", ChatData);
        handleChatMessage(ChatData);
    });
});

function UpdateConnectUser(socket){

    return function(userName){
    let userData = userBase.getUser(userName);
    //console.log(userData) 
    
    if(!userData){
        userData=userBase.setUser(socket,userName)  
      //  console.log(userData)
    }
    
    
    socket.emit("user updated",userData.Data.nickName)

}
    
}

function searchfriend(friendName,socket){
    const friendData = userBase.getUser(friendName)
            socket.emit("search friend",friendData?.Data)
}
function handleChatMessage(ChatData){
    const friendData=userBase.getUser(ChatData.friendName);
    
    friendData.connection.emit('chat message',ChatData)
}