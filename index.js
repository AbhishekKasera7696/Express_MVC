// const http = require('http');
// const express = require('express');
// const app = express()
// const connectToDB = require('./DBConnection/mongodb');
// const PORT = 9004;

// http.createServer(app).listen(PORT, () => {
//     new connectToDB();
//     console.log(`Server is running on port number ${PORT}`);
// })

const http = require('http');
const app = require('./Routes/user');
const connectToDB = require('./DBConnection/mongodb');
const PORT = 9004;

http.createServer(app).listen(PORT, () => {
    new connectToDB();
    console.log(`Server is running on port number ${PORT}`);
})
