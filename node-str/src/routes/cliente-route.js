'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cliente-controller');
const auth_services = require('../services/auth-services');

router.get('/', controller.listarClientes);
router.post('/', controller.salvar);
router.post('/sessao', controller.sessao);
router.post('/atualiza', auth_services.authorize, controller.atualizaSessao);

module.exports = router;