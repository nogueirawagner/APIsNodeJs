'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config')

const app = express();
const router = express.Router();

const Produto = require('./models/produto');
const Cliente = require('./models/cliente');
const Ordem = require('./models/ordem');

//Conecta ao banco
mongoose.connect(config.connectionString);

// Carrega rotas
const indexRoute = require('./routes/index-route');
const produtoRoute = require('./routes/produto-route');
const clienteRoute = require('./routes/cliente-route');
const ordemRoute = require('./routes/ordem-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, x-access-token');
    res.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/produtos', produtoRoute);
app.use('/clientes', clienteRoute);
app.use('/ordem', ordemRoute);

module.exports = app;