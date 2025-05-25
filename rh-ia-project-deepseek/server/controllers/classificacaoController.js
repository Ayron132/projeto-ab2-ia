const ClassificacaoService = require('../services/classificacaoService');

exports.classificarCandidato = async (req, res) => {
  try {
    const { candidato, vagaId } = req.body;

    // Normaliza dados ausentes
    const normalizedCandidate = {
      nome: candidato.nome || 'Não informado',
      experiencia: candidato.experiencia || 'Experiência não especificada',
      formacao: candidato.formacao || 'Formação não informada',
      habilidades: candidato.habilidades || []
    };

    // Chama o serviço de classificação
    const resultado = await ClassificacaoService.classificarCandidato(normalizedCandidate, vagaId);

    res.status(200).json({
      decisao: resultado.classificacao,
      scoreTotal: resultado.scoreTotal,
      criterios: resultado.justificativas,
      explicacao: this.gerarExplicacao(resultado.classificacao, resultado.justificativas)
    });
  } catch (error) {
    console.error("Erro no controller de classificação:", error);
    res.status(500).json({
      erro: "Erro interno no servidor",
      detalhes: error.message
    });
  }
};

exports.gerarExplicacao = (classificacao, justificativas) => {
  const pontosFortes = justificativas
    .filter(j => j.score >= 0.7)
    .map(j => j.criterio);
  
  const pontosFracos = justificativas
    .filter(j => j.score < 0.5)
    .map(j => j.criterio);

  let explicacao = `O candidato foi ${classificacao.toLowerCase()} porque `;

  if (classificacao === "Aprovado") {
    explicacao += `atende ou supera todos os critérios principais, especialmente em ${pontosFortes.join(', ')}.`;
  } else if (classificacao === "Aprovado parcialmente") {
    explicacao += `possui qualificações em ${pontosFortes.join(', ')}, mas precisa melhorar em ${pontosFracos.join(', ')}.`;
  } else {
    explicacao += `não atende aos requisitos mínimos, especialmente em ${pontosFracos.join(', ')}.`;
  }

  return explicacao;
};