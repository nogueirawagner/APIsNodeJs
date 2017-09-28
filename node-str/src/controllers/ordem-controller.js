'use strict';

const ordem_repo = require('../repositories/ordem-repositorio');
const validator = require('../validators/fluent-validator');
const guid = require('guid');

exports.listarOrdens = async (req, res) => {
    try {
        var data = await ordem_repo.listarOrdens();
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
}

exports.salvar = async (req, res) => {
    try {
        const data = ordem_repo.salvar({
            cliente: req.body.cliente,
            numero: guid.raw().substring(0, 3),
            items: req.body.items
        });
        res.status(200).send({
            message: 'Ordem cadastrado com sucesso.'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisiçao',
            data: e
        });
    }
}