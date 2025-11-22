const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true, min: 0 }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Produto', produtoSchema);
