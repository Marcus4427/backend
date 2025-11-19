const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
}, {
  timestamps: true // Adiciona createdAt e updatedAt
});

module.exports = mongoose.model('Usuario', userSchema);
