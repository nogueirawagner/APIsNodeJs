'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store Api",
        version: "0.0.1"
    });
});
app.use('/', route);

server.listen(port);
server.on('error', onError);
console.log('Rodando na porta ' + port);

// Normalizar porta
function normalizePort(valor) {
    const port = parseInt(valor, 10);

    if (isNaN(port))
        return val;

    if (port >= 0)
        return port;

    return false;
}

// Funções para tratar erro
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requerido privilegios elevados');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' está em uso');
            process.exit(1);
        default:
            throw error;
    }
}
