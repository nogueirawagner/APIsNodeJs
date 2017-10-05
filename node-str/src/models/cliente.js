'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email:
    {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    }]

});

module.exports = mongoose.model('Cliente', schema);