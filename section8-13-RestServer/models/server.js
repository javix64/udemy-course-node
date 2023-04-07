const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // classic way to define routes
        // this.authPath = '/api/auth';
        // this.usersPath = '/api/users';
        // this.categoriesPath = '/api/categories';

        // another refined way to define routes
        this.paths = {
            auth:        '/api/auth',
            users:       '/api/users',
            categories:  '/api/categories',
            products:  '/api/products',
            uploads:  '/api/uploads',

        }

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

        // fileUpload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    start(){
        this.app.listen(this.port,()=>{
            console.log('Server running in port: ', this.port)
        })
    }
}

module.exports = Server;
