const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

io.on('connection', async (socket) => {

    socket.on(`message`, async (message, cb) => {

    });

    socket.on('login', async (data) => {

    });

    socket.on('disconnect', async function() {

    });

});


