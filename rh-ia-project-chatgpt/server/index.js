const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

function extrairDados(mensagem) {
  const experiencia = /([0-9]+)\s+anos?/.exec(mensagem)?.[1] || 0;
  const conhecimentoTecnico = /React|Node|JavaScript|TypeScript/i.test(mensagem) ? 8 : 5;
  const softSkills = /comunica|lider|equipe|colabora/i.test(mensagem) ? 8 : 5;
  const formacao = /superior|faculdade|universidade/i.test(mensagem) ? 'sim' : 'nao';

  return {
    experiencia: parseInt(experiencia),
    conhecimentoTecnico,
    softSkills,
    formacao
  };
}

function classificarCandidato({ experiencia, conhecimentoTecnico, softSkills }) {
  if (experiencia >= 5 && conhecimentoTecnico >= 8 && softSkills >= 7) {
    return {
      resultado: 'Aprovado',
      justificativa: 'Experiência e habilidades técnicas compatíveis com o cargo.'
    };
  } else if (experiencia >= 2 && conhecimentoTecnico >= 6) {
    return {
      resultado: 'Aprovado parcialmente',
      justificativa: 'Boa base técnica, mas falta experiência ou soft skills.'
    };
  } else {
    return {
      resultado: 'Reprovado',
      justificativa: 'Perfil não atende aos requisitos mínimos do cargo.'
    };
  }
}

app.post('/classificar', (req, res) => {
  const { mensagem } = req.body;
  const dados = extrairDados(mensagem);
  const resultado = classificarCandidato(dados);
  res.json(resultado);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
