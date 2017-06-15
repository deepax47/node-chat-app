const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.emit('newMessage', {
        from: 'admin',
        text: 'Welcome to the chat',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'New user connected',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage' , message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('Client left the chat');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`server up and running on port ${port}`);
});   