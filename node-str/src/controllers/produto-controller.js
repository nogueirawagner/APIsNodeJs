'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto')

exports.post = (req, res) => {
	var prod = new Produto();
	prod.titulo = req.body.titulo;
	prod.codigo = req.body.codigo;
	prod.descricao = req.body.descricao;
	prod.preco = req.body.preco;
	prod.marca = [req.body.marca + " preta", req.body.marca + " amarela"];
	prod.save()
	.then(x => {
		res.status(201).send({mensagem: 'Produto cadastrado com sucesso'});
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
