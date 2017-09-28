'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordem-controller');

router.get('/', controller.listarOrdens);
router.post('/', controller.salvar);

module.exports = router;