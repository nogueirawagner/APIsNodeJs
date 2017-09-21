'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

const Produto = require('./models/produto');

//Conecta ao banco
mongoose.connect('mongodb://sa:sa@ds044989.mlab.com:44989/apisnode');

// Carrega rotas
const indexroute = require('./routes/index-route');
const produtoroute = require('./routes/produto-route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', indexroute);
app.use('/produtos', produtoroute);

module.exports = app;