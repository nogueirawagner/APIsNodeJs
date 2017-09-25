'use strict';

const mongoose = require('mongoose');
const produto = mongoose.model('Produto')
const produto_repo = require('../repositories/produto-repositorio');
const validator = require('../validators/fluent-validator');

exports.listarPorMarca = async (req, res) => {
	try {
		const data = produto_repo.listarPorMarca(req.params.marca);
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição',
			data: e
		});
	}
}

exports.listarPorID = async (req, res) => {
	try {
		const data = produto_repo.listarPorID(req.params.id);
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição',
			data: e
		});
	}
}

exports.listarProdCodigo = async (req, res) => {
	try {
		const data = await produto_repo.listarProdCodigo(req.params.codigo);
		res.status(200).send(data);
	}
	catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisiçao',
			data: e
		});
	}
}

exports.listarProdutos = async (req, res) => {
	try {
		var data = await produto_repo.listarProdutos();
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
	valid.hasMinLen(req.body.titulo, 3, 'O título deve conter no mínimo 3 caracteres.');
	valid.hasMinLen(req.body.descricao, 3, 'A descrição deve conter no mínimo 3 caracteres.');

	if (!valid.isValid()) {
		res.status(400).send(valid.errors()).end();
		return;
	}

	try {
		const data = produto_repo.salvar(req.body);
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisiçao',
			data: e
		});
	}
}

exports.alterarProduto = async (req, res) => {
	try {
		const data = produto_repo.alterarProduto(req.params.id, req.body);
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisiçao',
			data: e
		});
	}
};

exports.deletarProduto = async (req, res) => {
	try {
		const data = produto_repo.deletarProduto(req.body.id);
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição',
			data: e
		});
	}
};
