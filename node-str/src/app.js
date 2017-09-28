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
const indexroute = require('./routes/index-route');
const produtoroute = require('./routes/produto-route');
const clienteroute = require('./routes/cliente-route');
// const ordemroute = require('./routes/ordem-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexroute);
app.use('/produtos', produtoroute);
app.use('/clientes', clienteroute);
// app.use('/ordem', ordemroute);

module.exports = app;