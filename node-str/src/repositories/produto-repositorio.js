'use strict';

const mongoose = require('mongoose');
const produto = mongoose.model('Produto')

exports.listarPorMarca = async (marca) => {
    const result = await produto.find(
        {
            marca: marca,
            ativo: true
        }, 'codigo titulo preco marca');
    return result;
}

exports.listarProdutos = async () => {
    const result = await produto.find({
        ativo: true
    }, 'titulo preco marca');
    return result;
}

exports.listarPorID = async (id) => {
    const result = await produto.findById(id);
    return result
}

exports.listarProdCodigo = async (codigo) => {
    const result = await produto.findOne(
        {
            codigo: codigo,
            ativo: true
        }, 'codigo titulo preco marca');
        return result;
}

exports.salvar = async (data) => {
    var prod = new produto(data);
    const result = await prod.save();
    return result;
}

exports.alterarProduto = async (id, data) => {
    const result = await produto
        .findByIdAndUpdate(id,
        {
            $set:
            {
                titulo: data.titulo,
                descricao: data.descricao,
                preco: data.preco
            }
        });
        return result;
}

exports.deletarProduto = async (id) => {
    const result = await produto.findOneAndRemove(id);
    return result;
}