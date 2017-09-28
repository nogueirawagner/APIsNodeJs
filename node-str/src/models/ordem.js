'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    numero: {
        type: String,
        required: true,
    },
    datacriacao: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['criado', 'feito'],
        default: 'criado'
    },
    items: [{
        qtd: {
            type: Number,
            required: true,
            default: 1
        },
        preco: {
            type: Number,
            required: true,
        },
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        },
    }]
});

module.exports = mongoose.model('Ordem', schema);