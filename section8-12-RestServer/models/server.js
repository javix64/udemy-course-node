const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoute = '/api/users';
        this.authPath = '/api/auth';

        // Connect to DB
        this.connectDB();
        // Middlewares
        this.middlewares();

        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // Read and parse body
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.authPath ,require('../routes/auth'));
        this.app.use(this.usersRoute ,require('../routes/users'));
    }

    start(){
        this.app.listen(this.port,()=>{
            console.log('Server running in port: ', this.port)
        })
    }
}

module.exports = Server;