'use strict';

const mongoose = require('mongoose');
const cliente = mongoose.model('Cliente')

exports.listarClientes = async () => {
    const result = await cliente.find({}, 'nome email');
    return result;
}

exports.salvar = async (data) => {
    var cli = new cliente(data);
    const result = await cli.save();
    return result;
}