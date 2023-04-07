const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
        });
        console.info('DB started');

    } catch (error) {
        console.info('error',{error});
        throw new Error('Error starting dbConnection', error);
    }
};

module.exports = {
    dbConnection
}
