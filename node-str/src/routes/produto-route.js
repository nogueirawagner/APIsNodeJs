'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produto-controller');

router.get('/', controller.listarProdutos);
router.get('/:codigo', controller.listarProdCodigo);
router.get('/admin/:id', controller.listarPorID);
router.get('/marca/:marca', controller.listarPorMarca);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;	