'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordem-controller');
const auth_services = require('../services/auth-services');

router.get('/', auth_services.authorize, controller.listarOrdens);
router.post('/', auth_services.authorize, controller.salvar);

module.exports = router;