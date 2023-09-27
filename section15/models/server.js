const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        this.middlewares();

        this.routes();

        this.sockets();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors())

        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    routes(){
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets(){
        
        this.io.on('connection', socketController);

    }

    start(){
        this.server.listen(this.port,()=>{
            console.log('Server running in port: ', this.port)
        })
    }
}

module.exports = Server;
