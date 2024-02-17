// socketHandler.js

const socketio = require('socket.io');

function initializeSocket(httpServer) {
    const io = socketio(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ['GET', 'POST']
        },
    });

    io.on('connection', (socket) => {
        //console.log(socket.id);
        socket.on('chat', data => {
            io.sockets.emit('chat', data);
        });
    });
}

module.exports = initializeSocket;
