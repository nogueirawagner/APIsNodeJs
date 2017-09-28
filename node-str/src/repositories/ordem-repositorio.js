'use strict';

const mongoose = require('mongoose');
const ordem = mongoose.model('Ordem')

exports.listarOrdens = async () => {
    const result = await ordem
    .find({}, 'numero cliente items items.qtd items.preco items.produto')
    .populate('cliente', 'nome')
    .populate('items.produto', 'descricao');
    return result;
}

exports.salvar = async (data) => {
    var ord = new ordem(data);
    const result = await ord.save();
    return result;
}