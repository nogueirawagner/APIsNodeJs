'use strict';

const cliente_repo = require('../repositories/cliente-repositorio');
const validator = require('../validators/fluent-validator');

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
		const data = cliente_repo.salvar(req.body);
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisiçao',
			data: e
		});
	}
}