var socket = io();

socket.on('connect', function(){
    console.log('Connected to the server');
    socket.emit('createMessage', {
        to: "deepak",
        text: "hey whats up dude",
    });
});
socket.on('disconnect', function(){
    console.log('Disconnected from the server');
});

// socket.on('newEmail', function(email){
//     console.log('New Email',email);
// });


socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});