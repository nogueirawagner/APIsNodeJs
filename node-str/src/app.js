'use strict';

const express = require('express');
const app = express();
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        titulo: "Node API",
        versao: "0.0.1"
    });
});

const create = router.post('/', (req, res, next) => {
    res.status(201).send();
});

const read = router.read('/', (req, res) => {
    res.status(200).send();
});

app.use('/', route);
app.use('/produtos', create);

module.exports = app;