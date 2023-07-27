const express = require('express')
const fs = require('fs')
const app = express()
const server = require('http').createServer(app)
const { Server } = require("socket.io")
const socketServer = new Server(server);


server.listen(3000,()=>{
    console.log("3000")
})
app.get("/",(req,resp)=>{
    resp.sendFile(__dirname+"/index.html")
})  

socketServer.on("connection",(socket)=>{
    console.log("connected")

    socket.on("disconnect",(socket)=>{
        console.log("Disconnected")
    })

    socket.on('chat message',(msg=>{
        socketServer.emit("chat from server",msg)
        console.log(msg)
    }))
})

