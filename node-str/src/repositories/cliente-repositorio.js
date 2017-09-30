'use strict';

const mongoose = require('mongoose');
const cliente = mongoose.model('Cliente')

exports.listarClientes = async () => {
    const result = await cliente.find({}, 'nome email');
    return result;
}

exports.pegarPorID = async (id) => {
    const result = await cliente.findById(id);
    return result;
}

exports.salvar = async (data) => {
    var cli = new cliente(data);
    const result = await cli.save();
    return result;
}

exports.sessao = async (data) => {
    const res = await cliente.findOne({
        email: data.email,
        senha: data.senha
    });
    return res;
}

exports.atualizaSessao = async (data) => {
    const res = await cliente.findOne({
        email: data.email,
        senha: data.senha
    });
    return res;
}