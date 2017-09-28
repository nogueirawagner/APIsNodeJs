'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

const Produto = require('./models/produto');
const Cliente = require('./models/cliente');
const Ordem = require('./models/ordem');

//Conecta ao banco
mongoose.connect('mongodb://sa:sa@ds044989.mlab.com:44989/apisnode');

// Carrega rotas
const indexRoute = require('./routes/index-route');
const produtoRoute = require('./routes/produto-route');
const clienteRoute = require('./routes/cliente-route');
const ordemRoute = require('./routes/ordem-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/produtos', produtoRoute);
app.use('/clientes', clienteRoute);
app.use('/ordem', ordemRoute);

module.exports = app;