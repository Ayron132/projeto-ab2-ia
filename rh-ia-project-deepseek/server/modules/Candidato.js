const mongoose = require('mongoose');

const CandidatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefone: String,
  cargoDesejado: {
    type: String,
    required: true
  },
  experiencia: {
    type: String,
    required: true
  },
  formacao: {
    type: String,
    required: true
  },
  habilidades: {
    type: [String],
    required: true
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Candidato', CandidatoSchema);