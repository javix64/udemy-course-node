const socketController = (socket) => {
            
        socket.on('disconnect', data => { 
        });

        socket.on('send-msg', (payload, callback) => {
            const id = 123456;
            callback(id);
            socket.broadcast.emit('send-msg',payload);
        })
}

module.exports = {
    socketController
}