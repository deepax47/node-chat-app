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

    socket.emit('newMessage', {
        from: 'john',
        text:'yo dude, you ok',
        createdAt: 123
    })

    // socket.emit('newEmail', {
    //     from: 'deepak@example.com',
    //     text: 'yo, man whats up',
    //     createdAt: 123
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage' , message);
    });



    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail',newEmail);
    // })

    socket.on('disconnect', () => {
        console.log('Client left the chat');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`server up and running on port ${port}`);
});   