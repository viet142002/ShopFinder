const mongoose = require('mongoose');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const socketServer = require('./socketServer');

const app = require('./configs/appConfig');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', socket => {
    socketServer(socket);
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose
    .connect(process.env.MONGO_URI, {
        family: 4,
    })
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log(err);
    });
