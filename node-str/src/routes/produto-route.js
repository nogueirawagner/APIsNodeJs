'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produto-controller');
const auth_services = require('../services/auth-services');

router.get('/', controller.listarProdutos);
router.get('/:codigo', controller.listarProdCodigo);
router.get('/admin/:id', controller.listarPorID);
router.get('/marca/:marca', controller.listarPorMarca);
router.post('/', auth_services.authorize, controller.salvar);
router.put('/:id', controller.alterarProduto);
router.delete('/', controller.deletarProduto);

module.exports = router;