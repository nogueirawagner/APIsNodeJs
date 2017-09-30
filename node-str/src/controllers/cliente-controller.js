'use strict';

const cliente_repo = require('../repositories/cliente-repositorio');
const validator = require('../validators/fluent-validator');
const md5 = require('md5');
const email_service = require('../services/email-services');

exports.listarClientes = async (req, res) => {
	try {
		var data = await cliente_repo.listarClientes();
		res.status(200).send(data);
	}
	catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição',
			data: e
		});
	}
}


exports.salvar = async (req, res) => {
	let valid = new validator();
	valid.hasMinLen(req.body.nome, 3, 'O nome deve conter no mínimo 3 caracteres.');
	valid.hasMinLen(req.body.senha, 3, 'A senha deve conter entre 3 e 8 caracteres.');
	valid.hasMaxLen(req.body.senha, 8, 'A senha deve conter entre 3 e 8 caracteres.');
	valid.isEmail(req.body.email, 'O email deve ser válido.');

	if (!valid.isValid()) {
		res.status(400).send(valid.errors()).end();
		return;
	}

	try {
		const data = cliente_repo.salvar(
			{
				nome: req.body.nome,
				email: req.body.email,
				senha: md5(req.body.senha + global.SALT_KEY)
			});

		try {
			email_service.send(
				req.body.email, 
				'Bem vindo a node store', 
				global.EMAIL_TMPL.replace('{0}', req.body.nome));

		} catch (error) {
			message: 'Falha ao enviar email';
		}
		

		res.status(200).send({
			message: 'Cliente cadastrado com sucesso.'
		});
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisiçao',
			data: e
		});
	}
}