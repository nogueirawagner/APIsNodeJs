'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cliente-controller');

router.get('/', controller.listarClientes);
router.post('/', controller.salvar);

module.exports = router;