const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

const criar = async (req, res) => {
    if (!req.body.nome || !req.body.preco) {
        return res.status(422).json({ msg: "Nome e Preço são obrigatórios" });
    }
    try {
        const novoProduto = await Produto.create({
            nome: req.body.nome,
            preco: req.body.preco
        });
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(422).json({ msg: "Erro ao criar produto" });
    }
};

const listar = async (req, res) => {
    const produtosCadastrados = await Produto.find({});
    res.status(200).json(produtosCadastrados);
};

const buscar = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(422).json({ msg: "ID inválido" });
    }
    const produtoEncontrado = await Produto.findOne({ _id: req.params.id });
    if (produtoEncontrado) {
        res.status(200).json(produtoEncontrado);
    } else {
        res.status(404).json({ msg: "Produto não encontrado" });
    }
};

const atualizar = async (req, res) => {
    if (!req.body.nome || !req.body.preco) {
        return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }
    try {
        const produtoAtualizado = await Produto.findOneAndUpdate(
            { _id: req.params.id },
            { nome: req.body.nome, preco: req.body.preco },
            { runValidators: true, new: true }
        );
        if (!produtoAtualizado) {
            return res.status(404).json({ msg: "Produto não encontrado" });
        }
        res.status(200).json(produtoAtualizado);
    } catch (error) {
        res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }
};

const remover = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(422).json({ msg: "ID inválido" });
    }
    const produtoRemovido = await Produto.findOneAndDelete({ _id: req.params.id });
    if (produtoRemovido) {
        res.status(204).send();
    } else {
        res.status(404).json({ msg: "Produto não encontrado" });
    }
};

module.exports = {criar, listar, buscar, atualizar, remover};
