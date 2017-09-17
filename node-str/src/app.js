'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Carrega rotas
const indexroute = require('./routes/index-route');
const produtoroute = require('./routes/produto-route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', indexroute);
app.use('/produtos', produtoroute);

module.exports = app;