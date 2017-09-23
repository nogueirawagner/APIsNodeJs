'use strict';

const mongoose = require('mongoose');
const produto = mongoose.model('Produto')
const produto_repo = require('../repositories/produto-repositorio');
const validator = require('../validators/fluent-validator');

exports.listarPorMarca = (req, res) => {
	produto_repo
		.listarPorMarca(req.params.marca)
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
}

exports.listarPorID = (req, res) => {
	produto_repo
		.listarPorID(req.params.id)
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
}

exports.listarProdCodigo = (req, res) => {
	produto_repo
		.listarProdCodigo(req.params.codigo)
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
}

exports.listarProdutos = (req, res) => {
	produto_repo
		.listarProdutos()
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
}

exports.salvar = (req, res) => {
	let valid = new validator();
	valid.hasMinLen(req.body.titulo, 3, 'O título deve conter no mínimo 3 caracteres.');
	valid.hasMinLen(req.body.descricao, 3, 'A descrição deve conter no mínimo 3 caracteres.');

	if (!valid.isValid()) {
		res.status(400).send(valid.errors()).end();
		return;
	}

	produto_repo
		.salvar(req.body)
		.then(x => {
			res.status(201).send({ mensagem: 'Produto cadastrado com sucesso' });
		}).catch(e => {
			res.status(400).send({
				mensagem: 'Falha ao cadastrar o produto',
				data: e
			});
		});
}

exports.alterarProduto = (req, res) => {
	produto_repo
		.alterarProduto(req.params.id, req.body)
		.then(x => {
			res.status(200).send({ message: 'Produto atualizado!' });
		})
		.catch(e => {
			res.status(400)
				.send(
				{
					message: 'Falha ao atualizar produto com sucesso',
					data: e
				});
		});
};

exports.deletarProduto = (req, res) => {
	produto_repo
		.deletarProduto(req.body.id)
		.then(x => {
			res.status(200).send({ message: 'Produto removido com sucesso!' });
		})
		.catch(e => {
			res.status(400)
				.send(
				{
					message: 'Falha ao remover o produto',
					data: e
				});
		});
};
