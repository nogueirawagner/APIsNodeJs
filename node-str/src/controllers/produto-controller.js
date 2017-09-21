'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto')

exports.listarPorMarca = (req, res) => {
	Produto.find(
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
	Produto.findById(req.params.id)
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
}

exports.listarProdCodigo = (req, res) => {
	Produto.findOne(
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
	Produto.find(
		{ ativo: true }, // Traz somente os ativos
		'titulo preco') // Exibe somente as colunas titulo e preco
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
}

exports.post = (req, res) => {
	var prod = new Produto();
	prod.titulo = req.body.titulo;
	prod.codigo = req.body.codigo;
	prod.descricao = req.body.descricao;
	prod.preco = req.body.preco;
	prod.marca = [req.body.marca + " preta", req.body.marca + " amarela"];
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

exports.put = (req, res) => {
	const id = req.params.id;
	res.status(201).send({
		id: id,
		item: req.body
	});
};

exports.delete = (req, res) => {
	res.status(200).send(req.body);
};
