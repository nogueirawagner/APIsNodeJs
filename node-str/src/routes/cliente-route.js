'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cliente-controller');

router.get('/', controller.listarClientes);
router.post('/', controller.salvar);
router.post('/sessao', controller.sessao);

module.exports = router;