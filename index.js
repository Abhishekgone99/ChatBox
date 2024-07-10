// var app = require('express')();
// var http = require('http').Server(app);

const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server)


// Serve the index.html file when accessing the root URL
app.get('/',(req,res)=>{
    // res.sendFile('/index.html',{root:__dirname})
    res.sendFile(__dirname + '/index.html')
})

// Socket.IO connection handling
io.on('connection',(socket)=>{
    console.log('New user connected');

    // Listen for 'chat message' events from clients
    socket.on('chat message',(msg)=>{
        console.log('message:'+ msg);

         // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    })

    // Handle disconnection of clients
    socket.on('disconnect',()=>{
        console.log('User disconnected');
    })
})


// Start the server and listen on port 3000
server.listen(3000,()=>{
    console.log('listening to port 3000');
})