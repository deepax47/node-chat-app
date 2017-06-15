const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`server up and running on port ${port}`);
});   