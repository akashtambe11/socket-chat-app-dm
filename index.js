var express = require('express');
var socket = require('socket.io');
// require('dotenv').config();  // Requiring .env File

var app = express();
// const port = process.env.PORT;

var server = app.listen(3000, () => {
    console.log('Server is listening on Port: 3000');
});

//Static file folder
app.use(express.static('public'));

var io = socket(server);

io.on('connection', (socket) => {
    console.log('Made socket connection. ID:', socket.id);

    // Handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    // Handle typing event
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

});
