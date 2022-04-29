const mongoose = require('mongoose');

class Mongo {

    constructor() {
        this.createMongoConnection();
    }

    createMongoConnection() {
        mongoose.connect(`mongodb://abhishek:abhishek123@localhost:27017/abhishek`)


        mongoose.connection.once('open', () => {
            console.log("MongoDB is connected");
        })
        mongoose.connection.on('error', () => {
            console.log("Error occured in mongoDB connection");
        })
    }
}

module.exports = Mongo;