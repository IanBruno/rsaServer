const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const sockets = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

//Este es el archivo principal del servidor, en este se inicializa el socket para recibir conexiones y lanzar eventos del mismo
//como los que se describe a continuación:

io.on('connection', async (socket) => { // Este método arranca o comienza una conexión del socket parra recibir o enviar mensajes
    const s = {
        id: socket.id,
        name: socket.handshake.query.name,
    };

    socket.broadcast.emit('userConnected', s.name); //comunica a todos los cllientes que otro cliente se conectó para que aparezca en el chat

    sockets.push(s); //añade a la la lista de mensajes el evento de conexión
    console.log('Connection:', s);

    socket.on(`message`, async (message, cb) => { //Cuando recibe un mensaje lo emite a todos los clientes para que tengan su chat actualizado
        console.log({ from: s.name, message});
        io.emit('newMessage', JSON.stringify({ from: s.name, message}));
    });


    socket.on('disconnect', async function() {
        const index = sockets.findIndex(s => s.id === socket.id);
        sockets.splice(index, 1);
    });

});

module.exports = http;


