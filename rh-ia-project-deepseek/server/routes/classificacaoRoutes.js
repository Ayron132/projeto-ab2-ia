const express = require('express');
const classificacaoController = require('../controllers/classificacaoController');

const router = express.Router();

// Endpoint para classificar candidatos
router.post('/', classificacaoController.classificarCandidato);

module.exports = router;