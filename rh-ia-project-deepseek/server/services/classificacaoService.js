class ClassificacaoService {
  constructor() {
    this.pesos = {
      experiencia: 0.3,
      habilidades: 0.4,
      formacao: 0.2,
      fitCultural: 0.1
    };
  }

  // Método principal para classificar um candidato
  async classificarCandidato(candidato, vagaId) {
    try {
      // Em uma implementação real, buscaríamos a vaga do banco de dados
      const vaga = {
        _id: vagaId,
        titulo: "Desenvolvedor Fullstack",
        habilidadesDesejadas: ["JavaScript", "Node.js", "React", "MongoDB", "Express"],
        experienciaMinima: 2
      };

      // Calcula os scores individuais
      const scores = this.calcularScores(candidato, vaga);
      
      // Calcula o score total ponderado
      const scoreTotal = this.calcularScoreTotal(scores);
      
      // Determina a classificação
      const classificacao = this.determinarClassificacao(scoreTotal);
      
      // Gera justificativas
      const justificativas = this.gerarJustificativas(scores, candidato, vaga);

      return {
        classificacao,
        scoreTotal,
        scores,
        justificativas
      };
    } catch (error) {
      console.error("Erro no serviço de classificação:", error);
      throw error;
    }
  }

  calcularScores(candidato, vaga) {
    // Calcula match de habilidades
    const habilidadesMatch = this.calcularMatchHabilidades(
      candidato.habilidades, 
      vaga.habilidadesDesejadas
    );

    // Calcula score de experiência
    const experienciaScore = this.calcularExperienciaScore(
      candidato.experiencia, 
      vaga.experienciaMinima
    );

    // Score de formação (simplificado)
    const formacaoScore = candidato.formacao.includes("Superior") ? 0.8 : 0.5;

    // Score de fit cultural (simulado)
    const fitCulturalScore = 0.7; // Em uma implementação real, seria calculado

    return {
      habilidades: habilidadesMatch,
      experiencia: experienciaScore,
      formacao: formacaoScore,
      fitCultural: fitCulturalScore
    };
  }

  calcularMatchHabilidades(habilidadesCandidato, habilidadesDesejadas) {
    const matches = habilidadesCandidato.filter(habilidade => 
      habilidadesDesejadas.includes(habilidade)
    ).length;
    
    return matches / habilidadesDesejadas.length;
  }

  calcularExperienciaScore(experienciaTexto, experienciaMinima) {
    // Extrai anos de experiência do texto (simplificado)
    const anosExperiencia = this.extrairAnosExperiencia(experienciaTexto);
    return Math.min(anosExperiencia / experienciaMinima, 1);
  }

  extrairAnosExperiencia(texto) {
    // Expressão regular para encontrar anos de experiência
    const regex = /(\d+)\s+anos?/i;
    const match = texto.match(regex);
    return match ? parseInt(match[1], 10) : 0;
  }

  calcularScoreTotal(scores) {
    return (
      scores.habilidades * this.pesos.habilidades +
      scores.experiencia * this.pesos.experiencia +
      scores.formacao * this.pesos.formacao +
      scores.fitCultural * this.pesos.fitCultural
    );
  }

  determinarClassificacao(scoreTotal) {
    if (scoreTotal >= 0.8) return "Aprovado";
    if (scoreTotal >= 0.5) return "Aprovado parcialmente";
    return "Reprovado";
  }

  gerarJustificativas(scores, candidato, vaga) {
    const justificativas = [];
    const { habilidades, experiencia, formacao, fitCultural } = scores;

    // Justificativa para habilidades
    const habilidadesMatch = this.calcularMatchHabilidades(
      candidato.habilidades, 
      vaga.habilidadesDesejadas
    );
    const habilidadesPercent = Math.round(habilidadesMatch * 100);
    
    justificativas.push({
      criterio: "Habilidades Técnicas",
      score: habilidades,
      descricao: `O candidato possui ${habilidadesPercent}% das habilidades requeridas (${candidato.habilidades.join(', ')})`
    });

    // Justificativa para experiência
    const anosExperiencia = this.extrairAnosExperiencia(candidato.experiencia);
    justificativas.push({
      criterio: "Experiência Profissional",
      score: experiencia,
      descricao: anosExperiencia >= vaga.experienciaMinima ?
        `Possui ${anosExperiencia} anos de experiência (mínimo requerido: ${vaga.experienciaMinima})` :
        `Faltam ${vaga.experienciaMinima - anosExperiencia} anos para atingir a experiência mínima requerida`
    });

    // Justificativa para formação
    justificativas.push({
      criterio: "Formação Acadêmica",
      score: formacao,
      descricao: candidato.formacao.includes("Superior") ?
        "Possui formação superior na área" :
        "Formação não superior ou em área diferente"
    });

    // Justificativa para fit cultural
    justificativas.push({
      criterio: "Fit Cultural",
      score: fitCultural,
      descricao: "Perfil moderadamente alinhado com a cultura organizacional"
    });

    return justificativas;
  }
}

module.exports = new ClassificacaoService();