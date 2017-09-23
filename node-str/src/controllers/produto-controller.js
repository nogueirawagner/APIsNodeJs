'use strict';

const mongoose = require('mongoose');
const produto = mongoose.model('Produto')
const validator = require('../validators/fluent-validator');


exports.listarPorMarca = (req, res) => {
	produto.find(
		{
			marca: req.params.marca,
			ativo: true
		},
		'codigo titulo preco marca')
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
}

exports.listarPorID = (req, res) => {
	produto.findById(req.params.id)
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
}

exports.listarProdCodigo = (req, res) => {
	produto.findOne(
		{
			codigo: req.params.codigo,
			ativo: true
		},
		'codigo titulo preco marca')
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
}

exports.listarProdutos = (req, res) => {
	produto.find(
		{ ativo: true }, // Traz somente os ativos
		'titulo preco') // Exibe somente as colunas titulo e preco
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
}

exports.post = (req, res) => {
	let valid = new validator();
	valid.hasMinLen(req.body.titulo, 3, 'O título deve conter no mínimo 3 caracteres.');
	valid.hasMinLen(req.body.descricao, 3, 'A descrição deve conter no mínimo 3 caracteres.');

	if (!valid.isValid()) {
		res.status(400).send(valid.errors()).end();
		return;
	}

	var prod = new produto();
	prod.titulo = req.body.titulo;
	prod.codigo = req.body.codigo;
	prod.descricao = req.body.descricao;
	prod.preco = req.body.preco;
	prod.marca = req.body.marca;
	prod.save()
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
	produto
		.findByIdAndUpdate(req.params.id,
		{
			$set:
			{
				titulo: req.body.titulo,
				descricao: req.body.descricao,
				preco: req.body.preco
			}
		})
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
	produto
		.findOneAndRemove(req.body.id)
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
