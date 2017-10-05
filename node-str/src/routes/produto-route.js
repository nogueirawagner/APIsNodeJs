'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produto-controller');
const auth_services = require('../services/auth-services');

router.get('/', controller.listarProdutos);
router.get('/:codigo', controller.listarProdCodigo);
router.get('/admin/:id', controller.listarPorID);
router.get('/marca/:marca', controller.listarPorMarca);
router.post('/', auth_services.isAdmin, controller.salvar);
router.put('/:id', auth_services.isAdmin, controller.alterarProduto);
router.delete('/', auth_services.isAdmin, controller.deletarProduto);

module.exports = router;