const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const sockets = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

io.on('connection', async (socket) => {
    const s = {
        id: socket.id,
        name: socket.handshake.query.name,
    };

    socket.broadcast.emit('userConnected', s.name);

    sockets.push(s);
    console.log('Connection:', s);

    socket.on(`message`, async (message, cb) => {
        console.log({ from: s.name, message});
        io.emit('newMessage', JSON.stringify({ from: s.name, message}));
    });


    socket.on('disconnect', async function() {
        const index = sockets.findIndex(s => s.id === socket.id);
        sockets.splice(index, 1);
    });

});

module.exports = http;


