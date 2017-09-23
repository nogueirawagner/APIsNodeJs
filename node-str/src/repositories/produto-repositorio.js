'use strict';

const mongoose = require('mongoose');
const produto = mongoose.model('Produto')

exports.listarPorMarca = (marca) => {
    return produto.find(
        {
            marca: marca,
            ativo: true
        }, 'codigo titulo preco marca');
}

exports.listarProdutos = () => {
    return produto.find({
        ativo: true
    }, 'titulo preco marca');
}

exports.listarPorID = (id) => {
    return produto.findById(id);
}

exports.listarProdCodigo = (codigo) => {
    return produto.findOne(
        {
            codigo: codigo,
            ativo: true
        }, 'codigo titulo preco marca');
}

exports.salvar = (data) => {
    var prod = new produto(data);
    return prod.save();
}

exports.alterarProduto = (id, data) => {
    return produto
        .findByIdAndUpdate(id,
        {
            $set:
            {
                titulo: data.titulo,
                descricao: data.descricao,
                preco: data.preco
            }
        });
}

exports.deletarProduto = (id) => {
    return produto.findOneAndRemove(id);
}