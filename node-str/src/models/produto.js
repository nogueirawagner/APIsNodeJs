'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo:{
        type: String,
        required: true, 
        trim: true 
    },
    codigo: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    preco: {
        type: Number,
        required: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
    marca: [{
        type: String,
        required: true
    }]


});

module.exports = mongoose.model('Produto', schema);