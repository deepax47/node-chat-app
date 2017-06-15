const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.emit('newUser', {
        from: 'admin',
        text: 'Welcome to the chat',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'a new user has been connected',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage' , message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('Client left the chat');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`server up and running on port ${port}`);
});   