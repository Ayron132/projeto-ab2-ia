const mongoose = require('mongoose');

const VagaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  requisitos: {
    type: [String],
    required: true
  },
  habilidadesDesejadas: {
    type: [String],
    required: true
  },
  experienciaMinima: {
    type: Number, // em anos
    required: true
  },
  ativa: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Vaga', VagaSchema);