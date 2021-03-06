'use strict';

const cliente_repo = require('../repositories/cliente-repositorio');
const validator = require('../validators/fluent-validator');
const md5 = require('md5');
const email_service = require('../services/email-services');
const auth_services = require('../services/auth-services');

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
		const data = await cliente_repo.salvar(
			{
				nome: req.body.nome,
				email: req.body.email,
				senha: md5(req.body.senha + global.SALT_KEY),
				roles: req.body.roles
			});
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

exports.sessao = async (req, res) => {
	try {
		const data = await cliente_repo.sessao(
			{
				email: req.body.email,
				senha: md5(req.body.senha + global.SALT_KEY)
			});
		if (!data) {
			res.status(404).send({
				message: 'Email ou senhas inválidos'
			});
			return;
		}

		const token = await auth_services.generateToken({
			id: data._id,
			email: data.email,
			senha: data.senha,
			roles: data.roles
		});

		res.status(201).send({
			token: token,
			usuario: {
				email: data.email,
				senha: data.senha
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			message: 'Falha ao processar sua requisiçao',
			data: e
		});
	}
}

exports.atualizaSessao = async (req, res) => {
	try {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];
		const data_token = await auth_services.decodeToken(token);

		const cliente = await cliente_repo.pegarPorID(data_token.id);
		if(!cliente)
		{
			res.status(401).send({
				message: 'Cliente não encontrado'
			});
			return;
		}

		const newToken = await auth_services.generateToken({
			id: cliente._id,
			email: cliente.email,
			senha: cliente.senha,
			roles: cliente.roles
		});

		res.status(201).send({
			token: newToken,
			usuario: {
				email: cliente.email,
				senha: cliente.senha
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			message: 'Falha ao processar sua requisiçao',
			data: e
		});
	}
}