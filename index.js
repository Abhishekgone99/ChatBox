// var app = require('express')();
// var http = require('http').Server(app);

const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server)


app.get('/',(req,res)=>{
    // res.sendFile('/index.html',{root:__dirname})
    res.sendFile(__dirname + '/index.html')
})

io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('chat message',(msg)=>{
        console.log('message:'+ msg);
        io.emit('chat message', msg);
    })

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    })
})


server.listen(3000,()=>{
    console.log('listening to port 3000');
})